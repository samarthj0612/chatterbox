const CONFIG = require('../../config');
const URL = `http://${CONFIG.host}/user`;

export const getAllUsers = async cb => {
  try {
    const response = await fetch(`${URL}/all`);
    const resp = await response.json();
    if (response.ok) {
      cb(null, resp.data);
    } else {
      // console.error('Request failed with status:', response.status);
      cb(resp.message);
    }
  } catch (error) {
    console.error('API request error:', error);
    cb('API request error');
  }
};

export const deleteUser = async (username, cb) => {
  try {
    const response = await fetch(`${URL}/delete?username=${username}`);
    const resp = await response.json();
    if (response.ok) {
      cb(null, resp.data);
    } else {
      // console.error('Request failed with status:', response.status);
      cb(resp.message);
    }
  } catch (error) {
    console.error('API request error:', error);
    cb('API request error');
  }
};
