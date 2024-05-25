import { createSlice } from '@reduxjs/toolkit';
import { login } from 'src/api/auth';

const initialState = {
  loading: false,
  user: {},
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearUser } = loginSlice.actions;
export default loginSlice.reducer;
