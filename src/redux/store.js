import { configureStore } from '@reduxjs/toolkit';
import user from './features/user/userSlice';
import theme from './features/theme/themeSlice';
import album from './features/albums/albumsSlice';
import music from './features/musics/musicSlice';

const store = configureStore({
  reducer: {
    user,
    theme,
    album,
    music,
  },
  devTools: true,
});

export default store;
