import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import Loading from '../components/Loading';
import MusicList from '../components/MusicList';
import Navigation from '../components/Navigation';
import {
  closePlayer, fetchMusic, updateFavoritedSongs,
} from '../redux/features/musics/musicSlice';
import AudioPlayer from '../components/AudioPlayer';

const Album = () => {
  const { params: { id } } = useRouteMatch();

  const dispatch = useDispatch();
  const {
    artistInfos: { artworkUrl100, artistName, collectionName }, status,
  } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic(id));
    dispatch(updateFavoritedSongs({ track: {}, action: '' }));

    return () => {
      dispatch(closePlayer());
    };
  }, [dispatch, id]);

  return (
    <Box
      sx={ {
        marginBottom: '200px',
      } }
    >
      <Navigation loading={ status === 'loading' } />
      <AudioPlayer />
      {
        status === 'loading'
          ? <Loading />
          : (
            <Grid
              container
              justifyContent="center"
              sx={ {
                margin: '5rem auto 0 auto',
              } }
            >
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xl={ 4 }
                sx={ {
                  minHeight: 360,
                  minWidth: 300,
                  marginBottom: '2rem',
                } }
              >
                <img
                  src={ artworkUrl100 }
                  alt={
                    `Foto album ${collectionName} da cantor ${artistName}`
                  }
                  style={ {
                    minWidth: 300,
                  } }
                />
                <Typography
                  gutterBottom
                  variant="h2"
                  component="div"
                  sx={ {
                    fontWeight: 600,
                    fontSize: '2rem',
                    margin: '1rem 0',
                  } }
                >
                  { collectionName }
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={ {
                    margin: '.6rem 0',
                  } }
                >
                  { artistName }
                </Typography>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                xl={ 4 }
                sx={ {
                  width: '80%',
                  minWidth: 350,
                } }
              >
                <MusicList />
              </Grid>
            </Grid>
          )
      }
    </Box>
  );
};

export default Album;
