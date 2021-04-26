import React, { useState } from 'react';
import { useLazyApi } from '../../api';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Product } from '../../types';

type Props = {
  active: boolean;
  onClose: () => void;
};

const makeId = (): string => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 6; i += 1)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const ProductModal = ({ active, onClose }: Props): React.ReactElement => {
  const [error, setError] = useState<{
    name?: boolean;
    currency?: boolean;
    imgUrl?: boolean;
    price?: boolean;
  }>({});
  const { call: saveProduct } = useLazyApi('product', {
    method: 'post',
  });
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const reset = (): void => {
    setDescription('');
    setCurrency('');
    setPrice(0);
    setName('');
    setImgUrl('');
  };

  const addProduct = (): void => {
    if (error.name || error.currency || error.imgUrl || error.price) return;
    const newProduct: Omit<Product, 'reviews'> = {
      name,
      price,
      currency,
      description,
      imgUrl,
      id: makeId(),
    };
    saveProduct({ body: JSON.stringify(newProduct) }).then(() => {
      reset();
      onClose();
    });
  };
  return (
    <Modal onClose={onClose} active={active}>
      <div className="text-xl">Add Product</div>
      <form className="flex flex-col sm:w-96">
        <input
          value={name}
          onChange={(e): void => {
            const newVal = e.target.value;
            if (newVal.length > 0) {
              setError({ ...error, name: false });
            } else {
              setError({ ...error, name: true });
            }
            setName(newVal);
          }}
          type="string"
          placeholder="Name"
          className={`${
            error.name
              ? 'border-b-2 border-red-500'
              : 'border-b active:border-blue-300 focus:border-blue-300'
          } h-8 my-4 active:outline-none focus:outline-none`}
        />
        <textarea
          value={description}
          onChange={(e): void => {
            const newVal = e.target.value;
            setDescription(newVal);
          }}
          placeholder="Description"
          rows={3}
          className="my-4 border-b active:border-blue-300 focus:border-blue-300 active:outline-none focus:outline-none"
        />
        <input
          value={currency}
          onChange={(e): void => {
            const newVal = e.target.value;
            if (newVal.length > 0) {
              setError({ ...error, currency: false });
            } else {
              setError({ ...error, currency: true });
            }
            setCurrency(newVal);
          }}
          type="string"
          placeholder="Currency"
          className={`${
            error.currency
              ? 'border-b-2 border-red-500'
              : 'border-b active:border-blue-300 focus:border-blue-300'
          } h-8 my-4 active:outline-none focus:outline-none`}
        />
        <input
          value={price}
          onChange={(e): void => {
            const newVal = Number(e.target.value);
            if (newVal < 0) {
              setError({ ...error, price: true });
            } else {
              setError({ ...error, price: false });
            }
            setPrice(newVal);
          }}
          type="string"
          placeholder="Price"
          className={`${
            error.price
              ? 'border-b-2 border-red-500'
              : 'border-b active:border-blue-300 focus:border-blue-300'
          } h-8 my-4 active:outline-none focus:outline-none`}
        />
        <input
          value={imgUrl}
          onChange={(e): void => {
            const newVal = e.target.value;
            if (newVal.length > 0) {
              setError({ ...error, imgUrl: false });
            } else {
              setError({ ...error, imgUrl: true });
            }
            setImgUrl(newVal);
          }}
          type="string"
          placeholder="Image URL"
          className={`${
            error.imgUrl
              ? 'border-b-2 border-red-500'
              : 'border-b active:border-blue-300 focus:border-blue-300'
          } h-8 my-4 active:outline-none focus:outline-none`}
        />
        <Button onClick={addProduct}>Save</Button>
      </form>
    </Modal>
  );
};

export default ProductModal;
