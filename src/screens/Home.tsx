import React from 'react';
import useApi from '../api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

const Home = (): React.ReactElement => {
  const { data: products } = useApi<Array<Product>>('product');
  if (!products) return <div>Loading...</div>;
  return (
    <div className="pt-4 grid grid-cols-4 gap-x-8 gap-y-12">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Home;
