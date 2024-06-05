import { DetailsPlace, Filter, Place, PlaceResponse } from '@/types/types';

const API_URL = 'http://127.0.0.1:8000/api';

export const getPlaces = async (params: string = ''): Promise<Place[]> => {
  const data = await fetch(`${API_URL}/catalog/cafes${params}`);

  const { results }: PlaceResponse = await data.json();

  return results;
};

export const getPlace = async (id: string): Promise<DetailsPlace> => {
  const data = await fetch(`${API_URL}/catalog/cafes/${id}`);

  const place: DetailsPlace = await data.json();

  return place;
};

export const getFilters = async (): Promise<Filter | undefined> => {
  const data = await fetch(`${API_URL}/catalog/filters/`);

  const filters: Filter = await data.json();

  return filters;
};
