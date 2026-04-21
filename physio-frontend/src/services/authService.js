// src/services/authService.js
import API from '../api/axios';

export const loginUser = async (identifier, password) => {
  const response = await API.post('/users/login', { identifier, password });
  return response.data; // { token, user }
};

export const signupUser = async (username, email, password, role) => {
  const response = await API.post('/users/signup', {
    username,
    email,
    password,
    role: role.toLowerCase(),
  });
  return response.data;
};
