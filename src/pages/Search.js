import { Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React, { Component } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import SkeletonAlbums from '../components/SkeletonAlbums';
import Albums from '../components/Albums';

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
    const { history, toggleColorMode, mode } = this.props;
    const {
      artistsAlbums, artistSearched,
      inputValue, loading, requisitionEnd,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header
          history={ history }
          toggleColorMode={ toggleColorMode }
          mode={ mode }
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
        {loading && <SkeletonAlbums />}
        {requisitionEnd
          && (
            <Albums
              artistsAlbums={ artistsAlbums }
              artistSearched={ artistSearched }
              requisitionEnd={ requisitionEnd }
            />
          )}
      </div>
    );
  }
}

export default Search;
