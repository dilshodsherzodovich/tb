import { createAsyncThunk } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import { useHttp } from 'src/hooks/use-http';

const getAllInstructions = createAsyncThunk(
  'instruction/getParticipants',
  async ({ token, categoryId, status, date, workshop }) => {
    const { request } = useHttp();
    return request({
      url: `/instruction/participants/list/create/?category_id=${categoryId}${
        !isUndefined(status) ? `&status=${status}` : ''
      }${date ? `&date_created=${date}` : ''}${workshop ? `&workshop_id=${workshop}` : ''}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const getInstructionCategories = createAsyncThunk('instruction/categores', async ({ token }) => {
  const { request } = useHttp();
  return request({
    url: `/instruction/category/list/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const getInstructionsDetails = createAsyncThunk('instruction/detail', async ({ token, id }) => {
  const { request } = useHttp();
  return request({
    url: `/instruction/participants/detail/${id}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const startNewInstruction = createAsyncThunk(
  'instruction/add',
  async ({ token, data, workshop_id }) => {
    const { request } = useHttp();
    return request({
      method: 'POST',
      data,
      url: `/instruction/participants/list/create/${
        workshop_id ? `?workshop_id=${workshop_id}` : ''
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const confirmUsersAttendance = createAsyncThunk(
  'instruction/detail/confirm',
  async ({ token, id, data }) => {
    const { request } = useHttp();
    return request({
      method: 'PATCH',
      data,
      url: `/instruction/attendance/${id}/patch/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const addNewAttendance = createAsyncThunk('instruction/addNew', async ({ token, data }) => {
  const { request } = useHttp();
  return request({
    method: 'POST',
    data,
    url: `/instruction/attendance/list/create/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

const closeInstruction = createAsyncThunk(
  'instruction/detail/close',
  async ({ token, id, data }) => {
    const { request } = useHttp();
    return request({
      method: 'PATCH',
      data,
      url: `/instruction/participants/detail/${id}/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);

const getAllWorkShops = createAsyncThunk('instruction/workshops', async ({ token }) => {
  const { request } = useHttp();
  return request({
    method: 'GET',
    url: `/workshop/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

export {
  getAllWorkShops,
  closeInstruction,
  addNewAttendance,
  getAllInstructions,
  startNewInstruction,
  getInstructionsDetails,
  confirmUsersAttendance,
  getInstructionCategories,
};
