import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import searchAlbumsAPI from '../../../services/searchAlbumsAPI';

const initialState = {
  artistSearched: '',
  albums: [],
  status: 'idle',
  error: null,
};

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (artistName) => {
    try {
      const albumsReceived = await searchAlbumsAPI(artistName);
      return {
        albumsReceived,
        artistName,
      };
    } catch (error) {
      return error.message;
    }
  },
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.albums = [...payload.albumsReceived];
        state.artistSearched = payload.artistName;
      })
      .addCase(fetchAlbums.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export default albumsSlice.reducer;
