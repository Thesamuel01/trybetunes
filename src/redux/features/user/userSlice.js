import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, getUser, updateUser } from '../../../services/userAPI';

const initialState = {
  name: '',
  email: '',
  image: '',
  description: '',
  disable: true,
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ name }) => {
    try {
      if (name !== '') {
        await createUser({ name });
      }

      return await getUser();
    } catch (error) {
      return error.message;
    }
  },
);

export const updateUserInfos = createAsyncThunk(
  'user/updateUser',
  async (user) => {
    try {
      await updateUser(user);
    } catch (error) {
      return error.message;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserInfos: (state, { payload }) => {
      state[payload.key] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.name = payload.name;
        state.description = payload.description;
        state.email = payload.email;
        state.image = payload.image;

        const valid = [
          payload.name !== '',
          payload.description !== '',
          payload.email !== '' && /^[A-Z0-9]+@[A-Z]+.com/i.test(payload.email),
          payload.image !== '',
        ];

        state.disable = valid.some((check) => check === false);
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(updateUserInfos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfos.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateUserInfos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { changeUserInfos } = userSlice.actions;
export default userSlice.reducer;
