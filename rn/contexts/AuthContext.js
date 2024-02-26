// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  user: null,
  developerMode: false,
  isAuthenticated: false,
};

// Create the context
const AuthContext = createContext();

// Create a reducer function to handle authentication actions
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'DEVELOPER_MODE':
      return {
        ...state,
        developerMode: action.payload,
      };
    case 'REMOVE_AVATAR': {
      delete state.user.avatar;
      return state;
    }
    case 'UPDATE_AVATAR': {
      state.user.avatar = action.payload;
      return state;
    }
    default:
      return state;
  }
};

// Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
