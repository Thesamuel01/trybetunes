import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';
import Loading from '../components/Loading';
import MusicList from '../components/MusicList';
import Navigation from '../components/Navigation';
import { fetchMusic, updateFavoritedSongs } from '../redux/features/musics/musicSlice';

const Album = ({ match: { params: { id } } }) => {
  const dispatch = useDispatch();
  const {
    artistInfos: { artworkUrl100, artistName, collectionName }, status,
  } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(fetchMusic(id));
    dispatch(updateFavoritedSongs({ track: {}, action: '' }));
  }, []);

  return (
    <div data-testid="page-album">
      <Navigation loading={ status === 'loading' } />
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
    </div>
  );
};

Album.propTypes = {
  /* Trecho baseado nos links abaixo, para fazer a validacao de props objeto.
    Links:
    - https://stackoverflow.com/questions/46484026/eslint-react-router-v4-how-to-validate-match-params-props
    - https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  */
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
