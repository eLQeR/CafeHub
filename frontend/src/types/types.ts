export interface DetailsPlace {
  id: number;
  name: string;
  city: string;
  address: string;
  email: string;
  medium_check: number;
  mark: any;
  description: string;
  type: string;
  cuisine: CuisineType;
  metro: Metro;
  main_photo: string;
  contacts: any[];
  features: Feature[];
  images: DetailsImage[];
  reviews: Reviews[];
}

export type Reviews = {
  id: number;
  mark: number;
  description: string;
  images: ReviewsImage[];
};
type ReviewsImage = {
  image: string;
};

export type DetailsImage = {
  image: string;
};

export interface Metro {
  id: number;
  name: string;
  slug: string;
}

export type PlaceResponse = {
  count: number;
  next: number;
  previous: number;
  results: Place[];
};

export type Place = {
  id: number;
  name: string;
  address: string;
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
  green: Metro[];
  red: Metro[];
  blue: Metro[];
};
