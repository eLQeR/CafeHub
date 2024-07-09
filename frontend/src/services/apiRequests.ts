import { EmailVerifYType, HomePageDataType, PlaceResponse } from '@/types/types';
import { API_URL } from './constants';

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
}

const getEmailVerify = async (uuid:string) => {
  const data = await fetch(`${API_URL}/user/verify-email/${uuid}/`);

  const results: EmailVerifYType = await data.json();

  return results;
}

export const API = {
  getSearchData,
  getHomePageData,
  getEmailVerify
};
