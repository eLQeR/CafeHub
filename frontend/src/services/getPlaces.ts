import { DetailsPlace, Filter, PlaceResponse } from '@/types/types';
import { API_URL } from './constants';


export const getPlaces = async (params: string = ''): Promise<PlaceResponse> => {
  const data = await fetch(`${API_URL}/catalog/cafes${params}`);

  const results: PlaceResponse = await data.json();

  return results;
};

export const getPlace = async (id: string): Promise<DetailsPlace> => {
  const data = await fetch(`${API_URL}/catalog/cafes/${id}`);

  const place: DetailsPlace = await data.json();

  return place;
};

export const getFilters = async (): Promise<Filter | undefined> => {
  const data = await fetch(`${API_URL}/catalog/filters`);

  const filters: Filter = await data.json();

  return filters;
};

