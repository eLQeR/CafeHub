const API_URL = 'http://127.0.0.1:8000/api';

export type Place = {
  id: number;
  name: string;
  adress: string;
  medium_check: string;
  mark: number;
  type: string;
  cuisine: string;
  metro: string;
  main_photo: string;
};

export type Filter = {
  metro: MetroLines;
  features: Feature[];
  cafe_types: CafeType[];
  cuisine: CuisineType[];
};

type CafeType = {
  id: string;
  name: string;
  slug: string;
};

type CuisineType = {
  id: number;
  name: string;
  slug: string;
};

type Feature = {
  id: number;
  name: string;
};

type MetroLines = {
  green: MetroStation[];
  red: MetroStation[];
  blue: MetroStation[];
};

type MetroStation = {
  id: number;
  name: string;
  slug: string;
};

export const getPlaces = async (params: string = ''): Promise<Place[]> => {
  // console.log('params:', params);
  // console.log('link:', `${API_URL}/catalog/cafes${params}`);
  // http://127.0.0.1:8000/api/catalog/cafes?cuisine=Greek&types=Pizzeria
  const data = await fetch(`${API_URL}/catalog/cafes${params}`);

  const places: Place[] = await data.json();

  return places;
};

export const getFilters = async (): Promise<Filter | undefined> => {
  const data = await fetch(`${API_URL}/catalog/filters/`);

  const filters: Filter = await data.json();

  return filters;
};
