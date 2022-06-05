import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import ProfileInfos from '../components/ProfileInfos';

const Profile = () => {
  const { status } = useSelector((state) => state.user);

  return (
    <div data-testid="page-profile">
      <Navigation loading={ status === 'loading' } />
      <ProfileInfos />
    </div>
  );
};

export default Profile;
