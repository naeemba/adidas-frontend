import React from 'react';
import { Product as ProductType } from '../types';
import { locationUtils } from '../utils';
import Button from './Button';

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props): React.ReactElement => {
  return (
    <div className="flex flex-col p-4 border-t shadow hover:shadow-lg rounded-xl transition-all duration-200">
      <img
        src={product.imgUrl}
        alt={product.name}
        className="-mt-8 rounded-lg shadow-lg"
      />
      <div className="px-4 pt-5 pb-4">
        <h1 className="flex mb-2 text-xl font-bold leading-normal text-gray-900 uppercase">
          {product.name}
          <div className="inline-block ml-auto text-2xl">
            {product.price}
            <span className="ml-1 text-lg">
              {product.currency && product.currency.length > 0
                ? product.currency
                : '$'}
            </span>
          </div>
        </h1>
        <div className="mb-4 text-base font-light leading-relaxed text-gray-700">
          {product.description}
        </div>
        <Button
          onClick={(): void => locationUtils.pushState(`product/${product.id}`)}
          className="w-full mt-4"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Product;
