import React, { Component } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton, Menu } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

class MenuBar extends Component {
  render() {
    return (
      <Box>
        <IconButton sx={ { ml: 1 } } color="inherit">
          {true ? <Brightness7Icon /> : <Brightness4Icon />}
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
        <Menu
          id="menu-appbar"
          // anchorEl={anchorEl}
          anchorOrigin={ {
            vertical: 'top',
            horizontal: 'right',
          } }
          keepMounted
          transformOrigin={ {
            vertical: 'top',
            horizontal: 'right',
          } }
          // open={Boolean(anchorEl)}
          // onClose={handleClose}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem> */}
        </Menu>
      </Box>
    );
  }
}

export default MenuBar;
