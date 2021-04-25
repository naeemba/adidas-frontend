import React, { useState } from 'react';
import { useLazyApi } from '../../api';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Review } from '../../types';

type Props = {
  active: boolean;
  onClose: () => void;
};

const ReviewModal = ({ active, onClose }: Props): React.ReactElement => {
  const [error, setError] = useState<{ review?: boolean; rating?: boolean }>(
    {},
  );
  const productId = window.location.pathname.split('/').reverse()[0];
  const { call: saveReview } = useLazyApi<Review>(`reviews/${productId}`, {
    method: 'post',
    isReview: true,
  });
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const addReview = (): void => {
    if (error.review || error.rating) return;
    const newReview: Review = {
      text: review,
      rating,
      productId,
    };
    saveReview({ body: JSON.stringify(newReview) }).then(onClose);
  };
  return (
    <Modal onClose={onClose} active={active}>
      <div className="text-xl">Add Review</div>
      <form className="flex flex-col sm:w-96">
        <textarea
          value={review}
          onChange={(e): void => {
            const newVal = e.target.value;
            if (newVal.length > 0) {
              setError({ ...error, review: false });
            } else {
              setError({ ...error, review: true });
            }
            setReview(newVal);
          }}
          placeholder="Review"
          rows={3}
          className={`${
            error.review
              ? 'border-b-2 border-red-500'
              : 'border-b active:border-blue-300 focus:border-blue-300'
          } my-4 active:outline-none focus:outline-none`}
        />
        <input
          value={rating}
          onChange={(e): void => {
            const newVal = Number(e.target.value);
            if (newVal < 0 || newVal > 5 || newVal % 1 !== 0) {
              setError({ ...error, rating: true });
            } else {
              setError({ ...error, rating: false });
            }
            setRating(newVal);
          }}
          type="number"
          placeholder="Rating"
          min="0"
          max="5"
          step="1"
          className={`${
            error.rating
              ? 'border-b-2 border-red-500'
              : 'border-b active:border-blue-300 focus:border-blue-300'
          } h-8 my-4 active:outline-none focus:outline-none`}
        />
        <Button onClick={addReview}>Save</Button>
      </form>
    </Modal>
  );
};

export default ReviewModal;
