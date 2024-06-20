import { createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from 'src/hooks/use-http';

const login = createAsyncThunk('auth/login', async ({ data }) => {
  const { request } = useHttp();
  return request({
    method: 'POST',
    url: '/account/login/',
    data,
  });
});

const faceRecognition = createAsyncThunk('auth/face-regonition', async ({ token }) => {
  const { request } = useHttp();
  return request({
    method: 'POST',
    url: '/account/face-recognition/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

export { login, faceRecognition };
