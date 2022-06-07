import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box } from '@mui/system';
import Loading from '../components/Loading';
import img from '../images/background-login.jpg';
import { toggleTheme } from '../redux/features/theme/themeSlice';
import LoginInput from '../components/LoginInput';

const Login = () => {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);

  return (
    <Box data-testid="page-login">
      <IconButton
        sx={ {
          ml: 1,
          position: 'fixed',
          bgcolor: 'transparent',
        } }
        onClick={ () => dispatch(toggleTheme()) }
        color="inherit"
      >
        {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      { status === 'loading'
        ? <Loading />
        : (
          <Box
            sx={ {
              display: 'flex',
              height: '100vh',
              justifyContent: 'space-between',
              width: '100vw',
              '@media (max-width: 1200px)': {
                justifyContent: 'center',
              },
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
              <LoginInput />
            </Box>
            <Box
              sx={ {
                display: 'inline-block',
                backgroundImage: `url(${img})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%',
                width: '70%',
                '@media (max-width: 1200px)': {
                  display: 'none',
                },
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
