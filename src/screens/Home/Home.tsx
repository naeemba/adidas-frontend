import React, { useState } from 'react';
import useApi from '../../api';
import type { Product } from '../../types';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import ProductModal from './ProductModal';
import Alert from '../../components/Alert';

type Props = {
  search: string;
};

const Home = ({ search }: Props): React.ReactElement => {
  const [isActive, setActive] = useState(false);
  const { data: products, reload, error } = useApi<Array<Product>>('product');
  if (error)
    return (
      <Alert
        type="error"
        message=" Unfortunately something bad happened. Please try again later!"
      />
    );
  if (!products) return <Alert type="info" message="Loading..." />;
  return (
    <>
      <div className="flex justify-between px-4 mb-4 md:mx-0">
        <h1 className="text-3xl text-gray-700">Products</h1>
        <Button onClick={(): void => setActive(true)} className="my-auto">
          Add Product
        </Button>
      </div>
      <div className="px-4 pt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products
          // it seems that server is returning some of the items multiple times
          // so I need remove the duplicate ones
          .filter(
            (each, idx) => products.findIndex((e) => e.id === each.id) === idx,
          )
          .filter(
            (each) =>
              search.length < 1 ||
              each.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
          )
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
      <ProductModal
        active={isActive}
        onClose={(): void => {
          setActive(false);
          reload();
        }}
      />
    </>
  );
};

export default Home;
