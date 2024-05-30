import { createAsyncThunk } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import { useHttp } from 'src/hooks/use-http';

const getAllInstructions = createAsyncThunk('instruction/get', async ({ token, status }) => {
  const { request } = useHttp();
  return request({
    url: `/instruction/${!isUndefined(status) ? `?status=${status}` : ''}`,
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

const confirmUsersAttendance = createAsyncThunk(
  'instruction/detail/confirm',
  async ({ token, id, data }) => {
    const { request } = useHttp();
    return request({
      method: 'POST',
      data,
      url: `/instruction/worker/${id}/confirm/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const closeInstruction = createAsyncThunk(
  'instruction/detail/close',
  async ({ token, id, data }) => {
    const { request } = useHttp();
    return request({
      method: 'PATCH',
      data,
      url: `/instruction/detail/${id}/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

export { closeInstruction, getAllInstructions, getInstructionsDetails, confirmUsersAttendance };
