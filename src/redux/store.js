import { configureStore } from '@reduxjs/toolkit';
import user from './features/user/userSlice';
import theme from './features/theme/themeSlice';
import album from './features/albums/albumsSlice';
import music from './features/musics/musicSlice';
import navigation from './features/navigation/navigationSlice';

const store = configureStore({
  reducer: {
    user,
    theme,
    album,
    music,
    navigation,
  },
  devTools: true,
});

export default store;
