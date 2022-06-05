import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../../../services/favoriteSongsAPI';
import getMusics from '../../../services/musicsAPI';

const initialState = {
  musics: [],
  artistInfos: {
    artworkUrl100: '',
    artistName: '',
    collectionName: '',
  },
  favoritedSongs: [],
  checkedInputs: [],
  status: 'idle',
  error: null,
};

export const fetchMusic = createAsyncThunk(
  'music/fetchMusic',
  async (id) => {
    try {
      const [artistInfo, ...musics] = await getMusics(id);

      return {
        musics,
        artistInfo,
      };
    } catch (error) {
      return error.message;
    }
  },
);

export const updateFavoritedSongs = createAsyncThunk(
  'music/updateFavoritedSongs',
  async ({ track, action }) => {
    try {
      if (action === 'add') {
        await addSong(track);
      } else if (action === 'remove') {
        await removeSong(track);
      }
      const favoritedSongs = await getFavoriteSongs();
      const checkedInputs = favoritedSongs.length !== 0
        ? favoritedSongs.map(({ trackId }) => trackId) : [];

      return {
        favoritedSongs,
        checkedInputs,
      };
    } catch (error) {
      return error.message;
    }
  },
);

const musicSlice = createSlice({
  name: 'music',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMusic.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.musics = [...payload.musics];
        state.artistInfos = { ...payload.artistInfo };
      })
      .addCase(fetchMusic.rejected, (state) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(updateFavoritedSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateFavoritedSongs.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.favoritedSongs = [...payload.favoritedSongs];
        state.checkedInputs = [...payload.checkedInputs];
      })
      .addCase(updateFavoritedSongs.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export default musicSlice.reducer;
