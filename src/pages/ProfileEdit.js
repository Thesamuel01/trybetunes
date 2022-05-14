import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileEditInfos from '../components/ProfileEditInfos';

class ProfileEdit extends Component {
  render() {
    const { headerNavValue, setNavValue, history } = this.props;

    return (
      <div data-testid="page-profile-edit">
        <Header
          headerNavValue={ headerNavValue }
          setNavValue={ setNavValue }
          history={ history }
        />
        <ProfileEditInfos { ...this.props } />
      </div>
    );
  }
}

export default ProfileEdit;
