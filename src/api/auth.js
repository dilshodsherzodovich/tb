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

export { login };
