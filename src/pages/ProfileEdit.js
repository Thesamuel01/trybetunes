import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import ProfileEditInfos from '../components/ProfileEditInfos';

const ProfileEdit = () => {
  const { status } = useSelector((state) => state.user);

  return (
    <div data-testid="page-profile-edit">
      <Navigation loading={ status === 'loading' } />
      <ProfileEditInfos />
    </div>
  );
};

export default ProfileEdit;
