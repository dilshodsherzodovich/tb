import axios from 'axios';
import { API_URL } from 'src/config/config';
import { handleHttpError } from 'src/utils/handlehttpError';

export const useHttp = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  const request = async ({ method = 'GET', url, data, headers }) => {
    try {
      return await axiosInstance({
        method,
        url: `${API_URL}${url}`,
        data,
        headers: {
          ...headers,
          'ngrok-skip-browser-warning': 'any',
        },
      })
        .then((res) => res.data)
        .catch((error) => {
          handleHttpError(error);
          // return error?.response?.data?.detail ? { error: error.response.data } : {};
        });
    } catch (error) {
      handleHttpError(error);
    }
  };
  return { request };
};
