import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileInfos from '../components/ProfileInfos';

class Profile extends Component {
  render() {
    const { headerNavValue, setNavValue, history } = this.props;

    return (
      <div data-testid="page-profile">
        <Header
          headerNavValue={ headerNavValue }
          setNavValue={ setNavValue }
          history={ history }
        />
        <ProfileInfos />
      </div>
    );
  }
}

export default Profile;
