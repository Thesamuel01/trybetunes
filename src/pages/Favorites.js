import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '@mui/material';
import { Box } from '@mui/system';
import { updateFavoritedSongs } from '../redux/features/musics/musicSlice';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import Navigation from '../components/Navigation';

const Favorites = () => {
  const dispatch = useDispatch();
  const { status, favoritedSongs } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(updateFavoritedSongs({ track: {}, action: '' }));
  }, []);

  return (
    <section>
      <Navigation loading={ status === 'loading' } />
      <Box sx={ { padding: '0 2rem' } }>
        {status === 'loading' ? <Loading />
          : (
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
          ) }
      </Box>
    </section>
  );
};

export default Favorites;
