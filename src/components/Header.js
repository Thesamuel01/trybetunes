import React from 'react';
import { AppBar, Avatar, Chip, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/features/theme/themeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { name } = useSelector((state) => state.user);

  return (
    <Box
      sx={ {
        padding: '1rem',
      } }
    >
      <AppBar
        position="static"
        color="secondary"
        sx={ {
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        } }
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={ {
            fontWeight: 600,
            fontSize: '1.1rem',
            margin: 'auto 0',
            paddingLeft: '12px',
          } }
        >
          TrybeTunes
        </Typography>

        <Box
          sx={ { display: 'flex' } }
        >
          <IconButton
            sx={ { ml: 1 } }
            onClick={ () => dispatch(toggleTheme()) }
            color="inherit"
          >
            {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Stack
            direction="row"
            sx={ {
              margin: 'auto .5rem auto 0',
            } }
          >
            <Chip
              avatar={ <Avatar>{name && name[0].toUpperCase()}</Avatar> }
              label={ name }
            />
          </Stack>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
