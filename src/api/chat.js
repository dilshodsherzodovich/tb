import { createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from 'src/hooks/use-http';

const sendRequest = createAsyncThunk('chat/send', async ({ data, token }) => {
  const { request } = useHttp();
  return request({
    method: 'POST',
    url: '/instruction/chat/',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

export { sendRequest };
