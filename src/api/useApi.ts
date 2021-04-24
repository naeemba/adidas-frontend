import axios from 'axios';
import { useEffect, useState } from 'react';

type Options = {
  isReview?: boolean;
};

const useApi = <T>(url: string, options?: Options): { data: T | undefined } => {
  const { isReview } = options ?? {};
  const [data, setData] = useState();
  console.log(
    process.env.REACT_APP_REVIEW_URL,
    process.env.REACT_APP_DEFAULT_URL,
  );
  useEffect(() => {
    axios({
      method: 'GET',
      // baseURL: isReview
      //   ? process.env.REACT_APP_REVIEW_URL
      //   : process.env.REACT_APP_DEFAULT_URL,
      // url,
      url: 'http://localhost:3001/product',
    }).then(
      (res) => {
        setData(res.data);
      },
      (e) => {},
    );
  }, [isReview, url]);
  return { data };
};

export default useApi;
