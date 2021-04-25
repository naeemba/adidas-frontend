import axios from 'axios';
import { useEffect, useState } from 'react';

type Options = {
  isReview?: boolean;
  method?: 'get' | 'post' | 'put' | 'delete';
};

const useApi = <T>(
  url: string,
  options?: Options,
): { data: T | undefined; reload: () => void } => {
  const { isReview, method } = options ?? {};
  const [data, setData] = useState();
  const [key, setKey] = useState(0);
  const reload = (): void => {
    setKey((k) => k + 1);
  };
  useEffect(() => {
    axios({
      method: method ?? 'get',
      baseURL: isReview
        ? process.env.REACT_APP_REVIEW_URL
        : process.env.REACT_APP_DEFAULT_URL,
      url,
    }).then(
      (res) => {
        setData(res.data);
      },
      () => {},
    );
  }, [isReview, url, method, key]);
  return { data, reload };
};

export default useApi;
