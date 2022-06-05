import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: 'search',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changePath: (state, { payload }) => {
      const favoritePth = /\/favorites/i;
      const profilePth = /\/profile[/\w]*/i;

      switch (true) {
      case favoritePth.test(payload):
        state.path = 'favorites';
        break;

      case profilePth.test(payload):
        state.path = 'profile';
        break;

      default:
        state.path = 'search';
        break;
      }
    },
  },
});

export const { changePath } = navigationSlice.actions;

export default navigationSlice.reducer;
