import { createSlice } from '@reduxjs/toolkit';
import { faceRecognition, login } from 'src/api/auth';

const initialState = {
  loading: false,
  user: {},

  // face recognition
  face: {},
  faceLoading: false,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
    clearFace: (state) => {
      state.face = {};
      state.faceLoading = false;
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
      })

      // face-recognition
      .addCase(faceRecognition.pending, (state) => {
        state.faceLoading = true;
      })
      .addCase(faceRecognition.fulfilled, (state, action) => {
        state.face = action.payload;
        state.faceLoading = false;
      })
      .addCase(faceRecognition.rejected, (state) => {
        state.faceLoading = false;
      });
  },
});

export const { clearUser, clearFace } = loginSlice.actions;
export default loginSlice.reducer;
