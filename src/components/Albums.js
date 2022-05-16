import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import AlbumCard from './AlbumCard';

class Albums extends Component {
  render() {
    const { artistsAlbums, artistSearched } = this.props;

    return (
      <section>
        <Box sx={ { padding: '0 2rem' } }>
          <h2>{`Resultado de álbuns de: ${artistSearched}`}</h2>
          { artistsAlbums.length === 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (
              <Grid container spacing={ 2 }>
                { artistsAlbums.map(
                  ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
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
                  ),
                )}
              </Grid>
            )}
        </Box>
      </section>
    );
  }
}

Albums.propTypes = {
  artistsAlbums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistSearched: PropTypes.string.isRequired,
};

export default Albums;
