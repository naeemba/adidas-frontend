import axios from 'axios';
import { useCallback } from 'react';

type Options = {
  isReview?: boolean;
  method?: 'get' | 'post' | 'put' | 'delete';
};

const useLazyApi = <T>(
  url: string,
  options?: Options,
): { call: (options?: { body?: string }) => Promise<T> } => {
  const { isReview, method } = options ?? {};
  const call = useCallback(
    (opt?: { body?: string }): Promise<T> => {
      const { body } = opt ?? {};
      return new Promise<T>((resolve, reject) => {
        axios({
          method: method ?? 'get',
          baseURL: isReview
            ? process.env.REACT_APP_REVIEW_URL
            : process.env.REACT_APP_DEFAULT_URL,
          url,
          data: body,
          headers: { 'Content-Type': 'application/json' },
        }).then(
          (res) => {
            return resolve(res.data);
          },
          (e) => {
            return reject(e.status);
          },
        );
      });
    },
    [isReview, method, url],
  );
  return { call };
};

export default useLazyApi;
