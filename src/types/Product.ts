import type { Review } from './Review';

export type Product = {
  id: string;
  imgUrl: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  reviews: Array<Review>;
};
