import { EventEmitter } from '../bl/EventEmitter';
import CONFIG from '../../config';

const URL = `ws://${CONFIG.wsHost}`;
let ws;

export const connection = (userEmail, cb) => {
  ws = new WebSocket(URL);

  ws.onopen = () => {
    // WS Connection opened
    const dataToSend = {
      type: 'Connection-Request',
      email: userEmail,
    };
    ws.send(JSON.stringify(dataToSend));
    cb('WebSocket successfully connected');
  };

  ws.onmessage = event => {
    const data = JSON.parse(event.data);

    if (data.type === 'totalUsers') {
      EventEmitter.dispatch('totalUsers', data.data);
    }

    if (data.type === 'message') {
      EventEmitter.dispatch('newMessage', data.data);
    }
  };

  ws.onerror = e => {
    // An error occurred
    console.error(e.message);
  };

  ws.onclose = e => {
    // Connection closed
    console.log('Websocket connection closed :', e.code, e.reason);
  };
};

export const sendMessage = (user, message, cb) => {
  ws.send(
    JSON.stringify({
      type: 'message',
      to: user,
      message: message,
    }),
  );
  cb();
};

export const broadcastMessage = (message, cb) => {
  ws.send(
    JSON.stringify({
      type: 'broadcast',
      message: message,
    }),
  );
  cb();
};

export const getConnectedUsers = () => {
  ws.send(
    JSON.stringify({
      type: 'connectedUsers',
    }),
  );
};

export const wsDisconnect = cb => {
  ws.close();
  cb('Websocket successfully disconnected');
};
