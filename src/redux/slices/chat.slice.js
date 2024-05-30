import { createSlice } from '@reduxjs/toolkit';
import { sendRequest } from 'src/api/chat';

const initialState = {
  sending: false,
  history: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state, action) => {
        state.sending = true;
        state.history.push({
          id: action?.meta?.requestId,
          prompt: action.meta.arg?.data?.prompt,
          response: '',
        });
      })
      .addCase(sendRequest.fulfilled, (state, { payload, meta }) => {
        const requestIdx = state.history.findIndex((item) => item?.id === meta?.requestId);
        state.history[requestIdx].response = payload?.response;
        state.sending = false;
      })
      .addCase(sendRequest.rejected, (state) => {
        state.sending = false;
      });
  },
});

export default chatSlice.reducer;
