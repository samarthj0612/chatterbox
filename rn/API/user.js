const CONFIG = require('../../config');
const URL = `http://${CONFIG.host}/user`;

export const changePassword = async (data, cb) => {
  try {
    const response = await fetch(`${URL}/changePassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resp = await response.json();
    if (response.ok) {
      cb(null, resp.message);
    } else {
      // console.error('Request failed with status:', response.status);
      cb(resp.message);
    }
  } catch (error) {
    // console.error('API request error:', error);
    cb('API request error');
  }
};

export const updateProfile = async (data, id, cb) => {
  try {
    const response = await fetch(`${URL}/updateProfile?id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const resp = await response.json();
      cb(null, resp);
    } else {
      const errorData = await response.json();
      // console.error('Request failed with status:', response.status, 'Error:', errorData.message);
      cb(errorData.message);
    }
  } catch (error) {
    console.error('API request error:', error);
    cb('API request error');
  }
};

export const updateProfilePicture = async (data, id, cb) => {
  try {
    const response = await fetch(`${URL}/updateProfilePic?id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data,
    });
    if (response.ok) {
      const resp = await response.json();
      cb(null, resp);
    } else {
      const errorData = await response.json();
      // console.error('Request failed with status:', response.status, 'Error:', errorData.message);
      cb(errorData.message);
    }
  } catch (error) {
    console.error('API request error:', error.message);
    cb('API request error');
  }
};

export const removeProfilePicture = async (data, cb) => {
  try {
    const response = await fetch(`${URL}/removeProfilePic`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const resp = await response.json();
      cb(null, resp);
    } else {
      const errorData = await response.json();
      // console.error('Request failed with status:', response.status, 'Error:', errorData.message);
      cb(errorData.message);
    }
  } catch (error) {
    console.error('API request error:', error.message);
    cb('API request error');
  }
};

export const getAllContacts = async cb => {
  try {
    const response = await fetch(`${URL}/allContacts`);
    if (response.ok) {
      const resp = await response.json();
      cb(null, resp);
    } else {
      const resp = await response.json();
      cb(resp.message);
    }
  } catch (error) {
    // console.error('API request error:', error);
    cb('API request error');
  }
};
