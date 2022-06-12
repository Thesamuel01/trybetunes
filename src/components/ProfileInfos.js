import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/features/user/userSlice';
import Loading from './Loading';

const ProfileInfos = () => {
  const dispatch = useDispatch();
  const { name, email, image, description, status } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser({ name: '' }));
  }, [dispatch]);

  return (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      } }
    >
      <Card
        variant="outlined"
        sx={ {
          padding: '1.5rem',
          margin: '2rem',
          width: '35%',
          height: '70%',
          maxWidth: '400px',
          minWidth: '300px',
        } }
      >
        {status === 'succeeded'
          ? (
            <Box
              sx={ {
                height: '100%',
              } }
            >
              <Box
                sx={ {
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '2rem',
                } }
              >
                <Avatar
                  alt={ name }
                  src={ image }
                  sx={ {
                    height: '80px',
                    width: '80px',
                  } }
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  href="/profile/edit"
                >
                  Editar perfil
                </Button>
              </Box>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Nome
                </Typography>
                <Typography
                  variant="body1"
                  sx={ {
                    marginBottom: '2rem',
                  } }
                >
                  { name }
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  E-mail
                </Typography>
                <Typography
                  variant="body1"
                  sx={ {
                    marginBottom: '2rem',
                  } }
                >
                  { email === '' ? '-' : email }
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  Descrição
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body"
                  component="p"
                  align="justify"
                  sx={ {
                    wordWrap: 'break-word',
                    marginBottom: '2rem',
                  } }
                >
                  { description === '' ? '-' : description }
                </Typography>
              </CardContent>
            </Box>
          )
          : <Loading /> }
      </Card>
    </Box>
  );
};

export default ProfileInfos;
