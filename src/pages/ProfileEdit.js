import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileEditInfos from '../components/ProfileEditInfos';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <ProfileEditInfos { ...this.props } />
      </div>
    );
  }
}

export default ProfileEdit;
