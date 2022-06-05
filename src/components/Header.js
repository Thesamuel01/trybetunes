import React from 'react';
import { AppBar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AccountCircle } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/features/theme/themeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

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
        {/* <Stack direction="row" spacing={ 1 }>
          <Chip
            avatar={ <Avatar>{userName[0].toUpperCase()}</Avatar> }
            label={ userName }
          />
        </Stack> */}
        <Box>
          <IconButton
            sx={ { ml: 1 } }
            onClick={ () => dispatch(toggleTheme()) }
            color="inherit"
          >
            {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {/* <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={ {
              vertical: 'top',
              horizontal: 'right',
            } }
            keepMounted
            transformOrigin={ {
              vertical: 'top',
              horizontal: 'right',
            } }
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu> */}
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
