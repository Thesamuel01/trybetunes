import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, TextField } from '@mui/material';
import {
  changeUserInfos,
  fetchUser,
  updateUserInfos,
} from '../redux/features/user/userSlice';
import Loading from './Loading';

const ProfileEditInfos = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    status, name, description, email, image, disable,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser({ name: '' }));
  }, []);

  const saveUserInfos = (event) => {
    event.preventDefault();

    dispatch(updateUserInfos({
      description,
      email,
      image,
      name,
    }));

    history.push('/profile');
  };

  const handleInputChange = ({ target: { name: targetName, value } }) => {
    dispatch(changeUserInfos({ key: targetName, value }));
  };

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
          width: '30%',
          height: '60%',
          maxWidth: '400px',
          minWidth: '300px',
        } }
      >
        {status === 'succeeded'
          ? (
            <form onSubmit={ saveUserInfos }>
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
                <TextField
                  id="standard-basic"
                  label="Imagem"
                  variant="standard"
                  name="image"
                  value={ image }
                  onChange={ handleInputChange }
                />
              </Box>
              <CardContent>
                <TextField
                  fullWidth
                  color="secondary"
                  id="standard-basic"
                  label="Nome"
                  name="name"
                  variant="outlined"
                  value={ name }
                  onChange={ handleInputChange }
                  sx={ {
                    marginBottom: '2rem',
                  } }
                />
                <TextField
                  fullWidth
                  color="secondary"
                  id="standard-basic"
                  label="E-mail"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={ email }
                  onChange={ handleInputChange }
                  sx={ {
                    marginBottom: '2rem',
                  } }
                />
                <TextField
                  fullWidth
                  multiline
                  color="secondary"
                  id="standard-basic"
                  label="Descrição"
                  name="description"
                  rows={ 4 }
                  variant="outlined"
                  value={ description }
                  onChange={ handleInputChange }
                  sx={ {
                    marginBottom: '2rem',
                  } }
                />
                <Box
                  sx={ {
                    textAlign: 'center',
                  } }
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={ disable }
                  >
                    Editar perfil
                  </Button>
                </Box>
              </CardContent>
            </form>
          )
          : <Loading /> }
      </Card>
    </Box>
  );
};

export default ProfileEditInfos;
