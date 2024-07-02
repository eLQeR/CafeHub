import { API_URL } from './constants';

const getToken = async (email: string, password: string) => {
  const data = await fetch(`${API_URL}/user/token/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const res = await data.json();

  return res;
};

const getUserData = async (userToken: any) => {
  const data = await fetch(`${API_URL}/user/me/`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const res = await data.json();

  return res;
};

export const AUTH = {
  getToken,
  getUserData,
};
