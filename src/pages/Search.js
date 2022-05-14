import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
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
      isButtonDisabled: true,
      loading: false,
      artistsAlbums: [],
      requisitionEnd: false,
    };
  }

  enableButton = (name) => {
    this.setState({
      isButtonDisabled: name.length < 2,
    });
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.enableButton(value);

    this.setState({
      inputValue: value,
    });
  }

  getAlbums = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    console.log(inputValue);

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
      artistsAlbums, artistSearched, isButtonDisabled,
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
            width: '500px',
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
              <h2>{`Resultado de álbuns de: ${artistSearched}`}</h2>
              { artistsAlbums.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <div>
                    { artistsAlbums.map(
                      ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                        <AlbumCard
                          key={ collectionId }
                          albumImage={ artworkUrl100 }
                          albumName={ collectionName }
                          artistFullName={ artistName }
                          albumId={ collectionId }
                        />
                      ),
                    )}
                  </div>
                )}
            </section>
          ) }
      </div>
    );
  }
}

export default Search;
