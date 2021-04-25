import axios from 'axios';
import { useEffect, useState } from 'react';

type Options = {
  isReview?: boolean;
  method?: 'get' | 'post' | 'put' | 'delete';
};

const useApi = <T>(
  url: string,
  options?: Options,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { data: T | undefined; reload: () => void; error: any } => {
  const { isReview, method } = options ?? {};
  const [data, setData] = useState();
  const [key, setKey] = useState(0);
  const [error, setError] = useState();
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
        setError(undefined);
      },
      (e) => {
        setError(e);
      },
    );
  }, [isReview, url, method, key]);
  return { data, reload, error };
};

export default useApi;
