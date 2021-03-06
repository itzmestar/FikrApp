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
    error: null,
  };

  if (result.ok) {
    formatted.data = await result.json();
  }

  return formatted;
};

const formatError = (error) => {
  const formatted = {
    status: error,
    ok: false,
    error: 'Network Error!',
  };
  return formatted;
}

export const post = async (authenticate, destination, body) => {
  const headers = await getHeaders(authenticate);
  try {
  const result = await fetch(`${API_BASE_URL}${destination}`, {
    method: 'POST',
    headers,
    timeout: 5000,
    body: JSON.stringify(body),
  });

    const formattedResult = await formatResult(result);
    return formattedResult;
    } catch (error) {
    console.error(error);
    return formatError(error);
  }
};

export const get = async (authenticate, destination) => {
  const headers = await getHeaders(authenticate);
  try {
  const result = await fetch(`${API_BASE_URL}${destination}`, {
    method: 'GET',
    timeout: 5000,
    headers,
  });

  const formattedResult = await formatResult(result);
    return formattedResult;
    } catch (error) {
    console.error(error);
    return formatError(error);
  }
};
