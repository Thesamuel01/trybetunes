import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../../../services/favoriteSongsAPI';
import getMusics from '../../../services/musicsAPI';

const initialState = {
  musics: [],
  songsToBePlayed: [],
  artistInfos: {},
  favoritedSongs: [],
  checkedInputs: [],
  status: 'idle',
  error: null,
  currentSongPlaying: {},
  songIndex: 0,
  shuffle: false,
  repeat: false,
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
  async ({ track, action, pathname }) => {
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
        pathname,
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

      if (state.songIndex < state.songsToBePlayed.length - 1) {
        state.songIndex = nextSong;
        state.currentSongPlaying = state.songsToBePlayed[nextSong];
      }
    },
    goToPreviousSong: (state) => {
      const previousSong = state.songIndex - 1;

      if (state.songIndex > 0) {
        state.songIndex = previousSong;
        state.currentSongPlaying = state.songsToBePlayed[previousSong];
      }
    },
    playMusic: (state, { payload }) => {
      state.isPlaying = payload;
    },
    startPlayMusic: (state, { payload }) => {
      const index = state.songsToBePlayed
        .findIndex(({ trackId }) => payload.trackId === trackId);

      state.showPlayer = payload.play;
      state.currentSongPlaying = { ...state.songsToBePlayed[index] };
      state.songIndex = index;

      if (state.isPlaying) state.isPlaying = false;
    },
    repeatSong: (state) => {
      state.repeat = !state.repeat;
    },
    shuffleSongs: (state, { payload }) => {
      state.shuffle = !state.shuffle;

      let songsList = [];
      const stateValue = current(state);
      const RANDOM = 0.5;

      if (payload === '/favorites') songsList = [...stateValue.favoritedSongs];
      else songsList = [...stateValue.musics];

      const songsOnList = songsList
        .filter(({ trackId }) => trackId !== state.currentSongPlaying.trackId);

      state.songsToBePlayed = state.shuffle
        ? [state.currentSongPlaying, ...songsOnList.sort(() => Math.random() - RANDOM)]
        : [...songsList];
    },
    updateAgain: (state) => {
      state.currentSongPlaying = { ...state.favoritedSongs[state.songIndex] };
      state.songsToBePlayed = [...state.favoritedSongs];
    },
    closePlayer: (state) => {
      state.showPlayer = false;
      state.isPlaying = false;
      state.songIndex = 0;
      state.shuffle = false;
      state.repeat = false;
      state.currentSongPlaying = {};
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
        state.songsToBePlayed = [...payload.musics];
        state.artistInfos = { ...payload.artistInfo };
        state.currentSongPlaying = { ...state.songsToBePlayed[state.songIndex] };
      })
      .addCase(fetchMusic.rejected, (state, { payload }) => {
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

        if (payload.pathname) {
          state.songsToBePlayed = [...state.favoritedSongs];
        }
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
  shuffleSongs,
  repeatSong,
  updateAgain,
} = musicSlice.actions;
export default musicSlice.reducer;
