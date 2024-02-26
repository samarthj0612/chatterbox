const CONFIG = require('../../config');
const URL = `http://${CONFIG.host}/auth`;

export const checkSession = async (token, cb) => {
  try {
    const response = await fetch(`${URL}`, {
      headers: { authorization: token },
    });
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

export const login = async (data, cb) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
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

export const signup = async (data, cb) => {
  try {
    const response = await fetch(`${URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
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

export const logout = async cb => {
  try {
    const response = await fetch(`${URL}/logout`);
    const resp = await response.json();
    if (response.ok) {
      cb(null);
    } else {
      // console.error('Request failed with status:', response.status);
      cb(resp.message);
    }
  } catch (error) {
    console.error('API request error:', error);
    cb(error);
  }
};

export const resetPassword = async (eml, cb) => {
  try {
    const response = await fetch(`${URL}/resetPassword?id=${eml}`);
    if (response.ok) {
      cb(null);
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

export const verifyOtp = async (data, cb) => {
  try {
    const response = await fetch(`${URL}/verifyOtp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const resp = await response.json();
      // console.error('Request failed with status:', response.status, 'Error:', errorData.message);
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

export const changePasswordUsingOtp = async (data, cb) => {
  try {
    const response = await fetch(`${URL}/changePasswordUsingOtp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const resp = await response.json();
    if (response.ok) {
      cb(null, resp);
    } else {
      // console.error('Request failed with status:', response.status);
      cb(resp.message);
    }
  } catch (error) {
    // console.error('API request error:', error);
    cb('API request error');
  }
};
