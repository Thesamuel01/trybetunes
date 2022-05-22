import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileInfos from '../components/ProfileInfos';

class Profile extends Component {
  render() {
    const { history } = this.props;

    return (
      <div data-testid="page-profile">
        <Header
          history={ history }
        />
        <ProfileInfos />
      </div>
    );
  }
}

export default Profile;
