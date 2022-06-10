import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../../../services/favoriteSongsAPI';
import getMusics from '../../../services/musicsAPI';

const initialState = {
  musics: [],
  artistInfos: {},
  favoritedSongs: [],
  checkedInputs: [],
  status: 'idle',
  error: null,
  currentSongPlaying: {},
  repeat: false,
  songIndex: 0,
  isPlaying: false,
  showPlayer: false,
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
  reducers: {
    goToNextSong: (state) => {
      const nextSong = state.songIndex + 1;

      if (state.songIndex < state.musics.length - 1) {
        state.songIndex = nextSong;
        state.currentSongPlaying = state.musics[nextSong];
      }
    },
    goToPreviousSong: (state) => {
      const previousSong = state.songIndex - 1;

      if (state.songIndex > 0) {
        state.songIndex = previousSong;
        state.currentSongPlaying = state.musics[previousSong];
      }
    },
    playMusic: (state, { payload }) => {
      state.isPlaying = payload;
    },
    startPlayMusic: (state, { payload }) => {
      const index = state.musics.findIndex(({ trackId }) => payload.trackId === trackId);

      state.showPlayer = payload.play;
      state.currentSongPlaying = { ...state.musics[index] };
      state.songIndex = index;

      if (state.isPlaying) state.isPlaying = false;
    },
    closePlayer: (state) => {
      state.showPlayer = false;
      state.isPlaying = false;
      state.songIndex = 0;
      state.currentSongPlaying = { ...state.musics[0] };
    },
    repeatSong: (state) => {
      state.repeat = !state.repeat;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMusic.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.musics = [...payload.musics];
        state.artistInfos = { ...payload.artistInfo };
        state.currentSongPlaying = { ...state.musics[state.songIndex] };
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

export const {
  goToNextSong,
  goToPreviousSong,
  playMusic,
  startPlayMusic,
  closePlayer,
  repeatSong,
} = musicSlice.actions;
export default musicSlice.reducer;
