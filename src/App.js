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
  render() {
    return (
      <ScopedCssBaseline>
        <main className={ style.container }>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route
              exact
              path="/profile/edit"
              render={ (props) => <ProfileEdit { ...props } /> }
            />
            <Route path="*" component={ NotFound } />
          </Switch>
        </main>
      </ScopedCssBaseline>
    );
  }
}

export default App;
