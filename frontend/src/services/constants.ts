export const API_URL = 'http://localhost:8000/api';
export const IMG_URL = 'http://127.0.0.1:8000/';

export const PAGINATION_ITEM_LIMIT = 2;

export const MetroLines = [
  {
    id: 0,
    name: 'Червона лінія',
    slug: 'red',
  },
  {
    id: 1,
    name: 'Синя лінія',
    slug: 'blue',
  },
  {
    id: 2,
    name: 'Зелена лінія',
    slug: 'green',
  },
];

export const COLLECTIONS = [
  {
    url: 'places?feature_ids=2%2C17',
    imgUrl: '/img/kids-cafes2.jpg',
    name: 'Дитячі заклади',
  },
  {
    url: 'places?feature_ids=6&type_ids=1',
    imgUrl: '/img/live-music-bars3.jpg',
    name: 'Бари з живою музикою',
  },
  {
    url: 'places?feature_ids=3&cuisine_ids=11',
    imgUrl: '/img/vegan-burger.jpg',
    name: 'Бургери для Веганів',
  },
];
