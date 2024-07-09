import {
  EmailVerifYType,
  HomePageDataType,
  DetailsPlace,
  Filter,
  PlaceResponse,
} from '@/types/types';
import { API_URL } from './constants';
import { getSession } from 'next-auth/react';

const getSearchData = async (
  req: string,
  pageRequest: null | string
): Promise<PlaceResponse> => {
  let link = `${API_URL}/catalog/cafes?name=${req}`;
  if (pageRequest !== null) {
    link += `&page=${pageRequest}`;
  }
  const data = await fetch(link);

  const results: PlaceResponse = await data.json();

  return results;
};

const getHomePageData = async () => {
  const data = await fetch(`${API_URL}/catalog/index`);

  const results: HomePageDataType = await data.json();

  return results;
};

const getEmailVerify = async (uuid: string) => {
  const data = await fetch(`${API_URL}/user/verify-email/${uuid}/`);

  const results: EmailVerifYType = await data.json();

  return results;
};
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

const getPlaces = async (params: string = ''): Promise<PlaceResponse> => {
  const data = await fetch(`${API_URL}/catalog/cafes${params}`);

  const results: PlaceResponse = await data.json();

  return results;
};

const getPlace = async (id: string): Promise<DetailsPlace> => {
  const data = await fetch(`${API_URL}/catalog/cafes/${id}`);

  const place: DetailsPlace = await data.json();

  return place;
};

const getFilters = async (): Promise<Filter | undefined> => {
  const data = await fetch(`${API_URL}/catalog/filters`);

  const filters: Filter = await data.json();

  return filters;
};

const addReview = async (formData: FormData) => {
  const session = await getSession();

  const data = await fetch(`${API_URL}/catalog/reviews/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session?.user.access}`,
    },

    body: formData,
  });

  return await data.json();
};

export const API = {
  getSearchData,
  getHomePageData,
  getEmailVerify,
  getToken,
  getUserData,
  getPlaces,
  getPlace,
  getFilters,
  addReview
};
