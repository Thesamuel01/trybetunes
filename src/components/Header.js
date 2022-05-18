import { AppBar, Avatar, BottomNavigation, BottomNavigationAction, Chip, IconButton, Menu, Stack } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AccountCircle } from '@mui/icons-material';
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.updateUserName();
  }

  updateUserName = async () => {
    const { name } = await getUser();

    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { headerNavValue, setNavValue, history } = this.props;
    const { loading, userName } = this.state;

    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : (
            <Box>
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
                  <div>
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
                  </div>
                </Box>
              </AppBar>
              <BottomNavigation
                showLabels
                value={ headerNavValue }
                onChange={ (_, newValue) => {
                  setNavValue(newValue);

                  history.push(`/${newValue}`);
                } }
                sx={ {
                  '& .Mui-selected': {
                    '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                      color: (theme) => theme.palette.secondary.main,
                    },
                  },
                } }
              >
                <BottomNavigationAction
                  data-testid="link-to-search"
                  label="Pesquisa"
                  value="search"
                  icon={ <SearchIcon /> }
                />
                <BottomNavigationAction
                  data-testid="link-to-favorites"
                  label="Favoritas"
                  value="favorites"
                  icon={ <FavoriteIcon /> }
                />
                <BottomNavigationAction
                  data-testid="link-to-favorites"
                  label="Perfil"
                  value="profile"
                  icon={ <AccountCircleIcon /> }
                />
              </BottomNavigation>
            </Box>
          ) }
      </header>
    );
  }
}

export default Header;
