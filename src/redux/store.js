import { configureStore } from '@reduxjs/toolkit';
import login from './slices/login.slice';
import instructions from './slices/instruction.slice';

export const store = configureStore({
  reducer: { login, instructions },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
