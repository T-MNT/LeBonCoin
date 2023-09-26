import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import userAccountSlice from './slices/userAccountSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    userAccount: userAccountSlice,
  },
});
