import React from 'react';
import { useHistory } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loading from './Loading';
import Header from './Header';

const Navigation = ({ loading }) => {
  const history = useHistory();

  return (
    <div data-testid="header-component">
      {loading ? <Loading />
        : (
          <Box>
            <Header />
            <BottomNavigation
              showLabels
              value={ history.location.pathname.split('/')[1] }
              onChange={ (_, newValue) => history.push(`/${newValue}`) }
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
    </div>
  );
};

export default Navigation;
