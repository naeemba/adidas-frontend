import axios from 'axios';
import { useEffect, useState } from 'react';

type Options = {
  isReview?: boolean;
  method?: 'get' | 'post' | 'put' | 'delete';
};

const useApi = <T>(url: string, options?: Options): { data: T | undefined } => {
  const { isReview, method } = options ?? {};
  const [data, setData] = useState();
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
  }, [isReview, url, method]);
  return { data };
};

export default useApi;
