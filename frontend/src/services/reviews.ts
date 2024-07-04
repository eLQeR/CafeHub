import { API_URL } from './constants';
import { getSession } from 'next-auth/react';

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

export const REVIEW = {
  addReview,
};
