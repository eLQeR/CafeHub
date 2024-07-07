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
  google_address_url: string;
  cafe_url: string;
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

export type PaginationType = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type PlaceResponse = PaginationType & {
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

export type CafeUser = {
  id: string;
  email: string;
  is_staff: boolean;
  is_email_verified: boolean;
};

export type HomePagePlaceType = {
  id: number;
  name: string;
  address: string;
  medium_check: string;
  type: string;
  slug: string;
  main_photo: string;
};

export type HomePageDataType = {
  new: HomePagePlaceType[];
  popular: HomePagePlaceType[];
};
