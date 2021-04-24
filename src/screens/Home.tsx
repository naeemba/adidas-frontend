import React from 'react';
import useApi from '../api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

type Props = {
  search: string;
};

const Home = ({ search }: Props): React.ReactElement => {
  const { data: products } = useApi<Array<Product>>('product');
  if (!products) return <div>Loading...</div>;
  return (
    <div className="px-4 pt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
      {products
        .filter(
          (each) =>
            search.length < 1 ||
            each.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
        )
        .map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
    </div>
  );
};

export default Home;
