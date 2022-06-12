import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '@mui/material';
import { Box } from '@mui/system';
import {
  closePlayer, fetchMusic, updateFavoritedSongs,
} from '../redux/features/musics/musicSlice';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import Navigation from '../components/Navigation';
import AudioPlayer from '../components/AudioPlayer';

const RANDOM_ARTIST = '974485462';

const Favorites = () => {
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();
  const { status, favoritedSongs } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic(RANDOM_ARTIST));
    dispatch(updateFavoritedSongs({ track: {}, action: '', pathname }));

    return () => {
      dispatch(closePlayer());
    };
  }, [dispatch, pathname]);

  return (
    <section>
      <Navigation loading={ status === 'loading' } />
      <AudioPlayer />
      <Box sx={ { padding: '0 2rem' } }>
        {status === 'succeeded'
          ? (
            <div>
              <h1>Músicas favoritas:</h1>
              <List>
                {favoritedSongs.map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    track={ track }
                  />
                ))}
              </List>
            </div>
          )
          : <Loading /> }
      </Box>
    </section>
  );
};

export default Favorites;
