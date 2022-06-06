import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loading from './Loading';
import Header from './Header';
import { changePath } from '../redux/features/navigation/navigationSlice';

const Navigation = ({ loading }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useSelector((state) => state.navigation);

  useEffect(() => {
    const { location: { pathname } } = history;

    dispatch(changePath(pathname));
  }, []);

  return (
    <Box>
      {loading ? <Loading />
        : (
          <Box>
            <Header />
            <BottomNavigation
              showLabels
              value={ path }
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
    </Box>
  );
};

Navigation.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Navigation;
