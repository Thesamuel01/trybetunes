import { configureStore } from '@reduxjs/toolkit';
import fetchUsers from './userSlice';

const store = configureStore({
  reducer: {
    user: fetchUsers,
  },
  devTools: true,
});

export default store;
