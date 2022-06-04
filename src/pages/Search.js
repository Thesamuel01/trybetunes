import { Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import SkeletonAlbums from '../components/SkeletonAlbums';
import Albums from '../components/Albums';
import { fetchAlbums } from '../redux/features/albums/albumsSlice';
import Navigation from '../components/Navigation';

const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const { status } = useSelector((state) => state.album);

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const getAlbums = (event) => {
    event.preventDefault();

    setInput('');
    dispatch(fetchAlbums(input));
  };

  return (
    <div data-testid="page-search">
      <Navigation loading={ status === 'loading' } />
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
          onSubmit={ getAlbums }
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
              value={ input }
              onChange={ handleChange }
              label="Nome de Artista"
            />
          </FormControl>
        </form>
      </Box>
      {status === 'loading' && <SkeletonAlbums />}
      {status === 'succeeded' && <Albums /> }
    </div>
  );
};

export default Search;
