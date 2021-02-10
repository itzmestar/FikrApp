import { API_BASE_URL } from '../config/config';
import { getToken } from './token';

const getHeaders = async (authenticate) => {

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (authenticate) {
    const token = await getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

const formatResult = async (result) => {
  const formatted = {
    status: result.status,
    ok: result.ok,
  };

  if (result.ok) {
    formatted.data = await result.json();
  }

  return formatted;
};

export const post = async (authenticate, destination, body) => {
  const headers = await getHeaders(authenticate);

  const result = await fetch(`${API_BASE_URL}${destination}`, {
    method: 'POST',
    headers,
    timeout: 5000,
    body: JSON.stringify(body),
  });

  const formattedResult = await formatResult(result);
  return formattedResult;
};

export const get = async (authenticate, destination) => {
  const headers = await getHeaders(authenticate);

  const result = await fetch(`${API_BASE_URL}${destination}`, {
    method: 'GET',
    timeout: 5000,
    headers,
  });

  const formattedResult = await formatResult(result);
  return formattedResult;
};
