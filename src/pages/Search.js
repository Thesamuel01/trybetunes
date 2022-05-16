import { Box, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      artistSearched: '',
      loading: false,
      artistsAlbums: [],
      requisitionEnd: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      inputValue: value,
    });
  }

  getAlbums = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;

    this.setState(({ inputValue: input }) => ({
      loading: true,
      artistSearched: input,
      inputValue: '',
      requisitionEnd: false,
    }), async () => {
      const albums = await searchAlbumsAPI(inputValue);
  
      this.setState({
        artistsAlbums: [...albums],
        loading: false,
        requisitionEnd: true,
      });
    });
  }

  render() {
    const { headerNavValue, setNavValue, history } = this.props;
    const {
      artistsAlbums, artistSearched,
      inputValue, loading, requisitionEnd,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header
          headerNavValue={ headerNavValue }
          setNavValue={ setNavValue }
          history={ history }
        />
        <Box
          sx={ {
            display: 'flex',
            justifyContent: 'center',
            width: '80%',
            maxWidth: '500px',
            margin: '2rem auto',
          } }
        >
          <form
            style={ { width: '100%' } }
            onSubmit={ this.getAlbums }
          >
            <FormControl fullWidth sx={ { m: 1 } }>
              <InputLabel
                color="secondary"
                htmlFor="outlined-adornment-amount"
              >
                Nome de Artista
              </InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-amount"
                size="small"
                startAdornment={
                  <SearchIcon sx={ { color: 'action.active', mr: 1, my: 0.5 } } />
                }
                value={ inputValue }
                onChange={ this.handleChange }
                label="Nome de Artista"
              />
            </FormControl>
          </form>
        </Box>
        {loading && <Loading />}
        {requisitionEnd
          && (
            <section>
              <Box sx={ { padding: '0 2rem' } }>
                <h2>{`Resultado de álbuns de: ${artistSearched}`}</h2>
                { artistsAlbums.length === 0
                  ? <p>Nenhum álbum foi encontrado</p>
                  : (
                    <Grid container spacing={2}>
                      { artistsAlbums.map(
                        ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                          <Grid
                            key={ collectionId }
                            container
                            item
                            justifyContent="center"
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={2}
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
          ) }
      </div>
    );
  }
}

export default Search;
