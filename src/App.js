import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ScopedCssBaseline } from '@mui/material';
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
      headerNavValue: 'search',
    };
  }

  setNavValue = (newValue) => {
    this.setState({
      headerNavValue: newValue,
    });
  }

  render() {
    const { headerNavValue } = this.state;

    return (
      <ScopedCssBaseline>
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
                  headerNavValue={ headerNavValue }
                  setNavValue={ this.setNavValue }
                />
              ) }
            />
            <Route
              exact
              path="/album/:id"
              render={ (props) => (
                <Album
                  { ...props }
                  headerNavValue={ headerNavValue }
                  setNavValue={ this.setNavValue }
                />
              ) }
            />
            <Route
              exact
              path="/favorites"
              render={ (props) => (
                <Favorites
                  { ...props }
                  headerNavValue={ headerNavValue }
                  setNavValue={ this.setNavValue }
                />
              ) }
            />
            <Route
              exact
              path="/profile"
              render={ (props) => (
                <Profile
                  { ...props }
                  headerNavValue={ headerNavValue }
                  setNavValue={ this.setNavValue }
                />
              ) }
            />
            <Route
              exact
              path="/profile/edit"
              render={ (props) => (
                <ProfileEdit
                  { ...props }
                  headerNavValue={ headerNavValue }
                  setNavValue={ this.setNavValue }
                />
              ) }
            />
            <Route path="*" component={ NotFound } />
          </Switch>
        </main>
      </ScopedCssBaseline>
    );
  }
}

export default App;
