import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import style from './App.module.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      theme: createTheme({
        palette: {
          mode: 'dark',
        },
      }),
    };
  }

  render() {
    const { theme } = this.state;

    return (
      <ThemeProvider theme={ theme }>
        <CssBaseline>
          <main className={ style.container }>
            <Switch>
              <Route
                exact
                path="/"
                render={ (props) => <Login { ...props } /> }
              />
              <Route
                exact
                path="/search"
                render={ (props) => (
                  <Search
                    { ...props }
                  />
                ) }
              />
              <Route
                exact
                path="/album/:id"
                render={ (props) => (
                  <Album
                    { ...props }
                  />
                ) }
              />
              <Route
                exact
                path="/favorites"
                render={ (props) => (
                  <Favorites
                    { ...props }
                  />
                ) }
              />
              <Route
                exact
                path="/profile"
                render={ (props) => (
                  <Profile
                    { ...props }
                  />
                ) }
              />
              <Route
                exact
                path="/profile/edit"
                render={ (props) => (
                  <ProfileEdit
                    { ...props }
                  />
                ) }
              />
              <Route path="*" component={ NotFound } />
            </Switch>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}

export default App;
