import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import img from '../images/background-login.jpg';
import { fetchUser } from '../redux/features/user/userSlice';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [isButtonDisabled, setDisableState] = useState(true);

  const handleChange = ({ target }) => {
    const { value } = target;

    setName(value);
    setDisableState(name.length <= 2);
  };

  const createUserProfile = (event) => {
    event.preventDefault();

    dispatch(fetchUser({ name }));
    history.push('/search');
  };

  return (
    <Box data-testid="page-login">
      { status === 'loading'
        ? <Loading />
        : (
          <Box
            sx={ {
              display: 'flex',
              height: '100vh',
              justifyContent: 'space-between',
              width: '100vw',
            } }
          >
            <Box
              sx={ {
                display: 'flex',
                flexGrow: '2',
                height: '110px',
                justifyContent: 'center',
                margin: 'auto 0',
              } }
            >
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
                    alignItems: 'flex-end',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 auto',
                    width: 300,
                  } }
                >
                  <AccountCircle sx={ { color: 'action.active', mr: 1, my: 0.5 } } />
                  <TextField
                    id="input-with-sx"
                    label="Name"
                    name="name"
                    fullWidth
                    variant="standard"
                    value={ name }
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
            </Box>
            <Box
              sx={ {
                display: 'inline-block',
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%',
                width: '70%',
              } }
            />
          </Box>
        ) }
    </Box>
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
