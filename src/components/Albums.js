import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Grid, Grow } from '@mui/material';
import AlbumCard from './AlbumCard';

const Albums = () => {
  const { albums, artistSearched, status } = useSelector((state) => state.album);

  return (
    <section>
      <Box sx={ { padding: '0 2rem' } }>
        <h2>{`Resultado de álbuns de: ${artistSearched}`}</h2>
        { albums.length === 0
          ? <p>Nenhum álbum foi encontrado</p>
          : (
            <Grid container spacing={ 2 }>
              { albums.map(
                ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                  <Grow
                    key={ collectionId }
                    in={ status === 'succeeded' }
                    style={ { transformOrigin: '0 0 0' } }
                    { ...(status === 'succeeded' ? { timeout: 1000 } : {}) }
                  >
                    <Grid
                      key={ collectionId }
                      container
                      item
                      justifyContent="center"
                      xs={ 12 }
                      sm={ 6 }
                      md={ 4 }
                      lg={ 3 }
                      xl={ 2 }
                    >
                      <AlbumCard
                        key={ collectionId }
                        albumImage={ artworkUrl100 }
                        albumName={ collectionName }
                        artistFullName={ artistName }
                        albumId={ collectionId }
                      />
                    </Grid>
                  </Grow>
                ),
              )}
            </Grid>
          )}
      </Box>
    </section>
  );
};

export default Albums;
