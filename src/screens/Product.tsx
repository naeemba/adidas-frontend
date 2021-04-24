import React from 'react';
import useApi from '../api';
import { Product as ProductType } from '../types';
import { ReactComponent as StarIcon } from '../assets/star-icon.svg';
import Button from '../components/Button';

const Product = (): React.ReactElement => {
  const productId = window.location.pathname.split('/').reverse()[0];
  const { data: product } = useApi<ProductType>(`product/${productId}`);
  if (!product) return <div>Loading...</div>;
  return (
    <div className="w-full md:px-4">
      <div className="flex flex-col p-4 pt-0 md:flex-row md:p-8 md:border-t md:shadow-lg md:rounded-xl">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="md:rounded-xl"
        />
        <div className="flex-1 my-8 md:ml-8">
          <div className="flex text-4xl font-bold text-gray-700 uppercase">
            {product.name}
            <div className="inline-block ml-auto text-4xl">
              {product.price}
              <span className="text-xl">
                {product.currency && product.currency.length > 0
                  ? product.currency
                  : '$'}
              </span>
            </div>
          </div>
          <div className="text-lg font-bold text-gray-500">
            {product.description}
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-8 mb-4 md:mx-0">
        <h1 className="text-3xl text-gray-700">Reviews</h1>
        <Button onClick={(): void => {}} className="my-auto">
          Add Review
        </Button>
      </div>
      <div className="px-4 md:px-0 lg:pb-8 grid gap-8 lg:grid-cols-2">
        {product.reviews.map((review, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${review.text}${idx}`}
            className="p-4 border-t shadow rounded-xl"
          >
            <div className="flex mb-4">
              {Array(5)
                .fill(0)
                .map((each, reviewIdx) =>
                  reviewIdx < review.rating ? (
                    <StarIcon
                      // eslint-disable-next-line react/no-array-index-key
                      key={reviewIdx}
                      className="w-5 text-yellow-300 fill-current"
                    />
                  ) : (
                    <StarIcon
                      // eslint-disable-next-line react/no-array-index-key
                      key={reviewIdx}
                      className="w-5 text-gray-300 fill-current"
                    />
                  ),
                )}
            </div>
            <span className="capitalize">{review.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
