import { createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from 'src/hooks/use-http';

const getAllInstructions = createAsyncThunk('instruction/getAll', async ({ token }) => {
  const { request } = useHttp();
  return request({
    url: '/instruction/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const getInstructionsDetails = createAsyncThunk('instruction/detail', async ({ token, id }) => {
  const { request } = useHttp();
  return request({
    url: `/instruction/detail/${id}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

export { getAllInstructions, getInstructionsDetails };
