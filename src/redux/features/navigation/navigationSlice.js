import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: '',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changePath: (state, action) => {
      switch (action) {
        case 'favorites':
          state.path = action;
          break;
      
        default:
          state.path = 'search';
          break;
      }
    },
  }
});

export default navigationSlice.reducer;
