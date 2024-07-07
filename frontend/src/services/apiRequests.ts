import { PlaceResponse } from '@/types/types';
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

export const API = {
  getSearchData,
};
