import { post, get } from './fetch';

export const login = (username, password) => {
  return post(false, 'authentication/token/', {
          username: username,
          password: password,
        });
};

export const getItems = () => {
  return get(true, 'api/item');
};