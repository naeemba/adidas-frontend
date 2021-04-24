import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_DEFAULT_URL,
});

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosInstance;
