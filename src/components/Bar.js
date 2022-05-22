import { AppBar, IconButton, Menu } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AccountCircle } from '@mui/icons-material';

class Bar extends Component {
  render() {
    return (
      <Box
        sx={ {
          padding: '1rem',
        } }
      >
        <AppBar
          position="static"
        >
          <Box
            sx={ {
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            } }
          >
            TrybeTunes
            {/* <Stack direction="row" spacing={ 1 }>
              <Chip
                avatar={ <Avatar>{userName[0].toUpperCase()}</Avatar> }
                label={ userName }
              />
            </Stack> */}
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
          </Box>
        </AppBar>
      </Box>
    );
  }
}

export default Bar;
