import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, getUser } from '../services/userAPI';

const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ name }) => {
    try {
      await createUser({ name });
      const { name: userName } = await getUser();

      return userName;
    } catch (error) {
      return error.message;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.name = payload;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export default userSlice.reducer;
