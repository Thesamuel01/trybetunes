import { AccountCircle } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchUser } from '../redux/features/user/userSlice';

const LoginInput = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({
    name: '',
    password: '',
  });
  const [isButtonDisabled, setDisableState] = useState(true);

  const handleChange = ({ target: { name, value } }) => {
    setUser(() => ({
      ...user,
      [name]: value,
    }));
    setDisableState(user.name.length <= 2);
  };

  const createUserProfile = (event) => {
    event.preventDefault();
    const { name, password } = user;

    dispatch(fetchUser({ name, password }));

    history.push('/search');
  };

  return (
    <form
      style={ {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
      onSubmit={ createUserProfile }
    >
      <Box
        sx={ {
          display: 'flex',
          flexFlow: 'column wrap',
          alignItems: 'flex-end',
          marginBottom: '1rem',
          gap: '15px',
        } }
      >
        <Box
          sx={ {
            alignItems: 'flex-end',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            width: 300,
          } }
        >
          <AccountCircle sx={ { color: 'action.active', mr: 1, my: 0.5 } } />
          <TextField
            label="Name"
            name="name"
            fullWidth
            variant="standard"
            autoComplete="current-name"
            value={ user.name }
            onChange={ handleChange }
          />
        </Box>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          sx={ {
            width: '268px',
          } }
          value={ user.password }
          onChange={ handleChange }
        />
      </Box>
      <Button
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        disabled={ isButtonDisabled }
      >
        Entrar
      </Button>
    </form>
  );
};

export default LoginInput;
