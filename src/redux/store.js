import { configureStore } from '@reduxjs/toolkit';
import login from './slices/login.slice';
import instructions from './slices/instruction.slice';
import chat from './slices/chat.slice';

export const store = configureStore({
  reducer: { login, instructions, chat },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
