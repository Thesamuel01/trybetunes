import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
              <Box
                sx={ {
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 1.5rem',
                } }
              >
                TrybeTunes
                <Box
                  sx={ {
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  } }
                >
                  <AccountCircle sx={ { color: 'action.active', mr: 1, my: 0.5 } } />
                  <span data-testid="header-user-name">{ userName }</span>
                </Box>
              </Box>
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
