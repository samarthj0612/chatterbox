import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  isWsConnected: false,
  count: 0,
  notifications: [],
};

const NotifContext = createContext();

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'WSCONNECTED':
      return {
        ...state,
        isWsConnected: true,
      };
    case 'MESSAGE':
      return {
        ...state,
        count: ++state.count,
        notifications: [action.payload, ...state.notifications],
      };
    case 'BROADCAST':
      return {
        ...state,
        count: ++state.count,
        notifications: [action.payload, ...state.notifications],
      };
    case 'WSDISCONNECTED':
      return {
        ...state,
        isWsConnected: false,
      };
    default:
      return state;
  }
};

export const NotifProvider = ({ children }) => {
  const [notifState, notifDispatch] = useReducer(notifReducer, initialState);

  return (
    <NotifContext.Provider value={{ notifState, notifDispatch }}>
      {children}
    </NotifContext.Provider>
  );
};

export const useNotif = () => {
  return useContext(NotifContext);
};
