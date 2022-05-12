import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileInfos from '../components/ProfileInfos';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <ProfileInfos />
      </div>
    );
  }
}

export default Profile;
