import { post } from './fetch';

export const login = (username, password) => {
  return post(false, 'authentication/token/', {
          username: username,
          password: password,
        });
};

export const createAccount = (email, password) => {
  return post('/users', {
    user: { email, password },
  });
};