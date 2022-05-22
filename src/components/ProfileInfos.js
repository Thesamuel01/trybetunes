import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileInfos extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      email: '',
      image: '',
      finishRender: false,
    };
  }

  async componentDidMount() {
    const { name, description, email, image } = await getUser();

    this.setState({
      name,
      description,
      email,
      image,
      finishRender: true,
    });
  }

  render() {
    const { name, description, email, image, finishRender } = this.state;

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
          {finishRender
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
                    sx={ { wordWrap: 'break-word' } }
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
  }
}

export default ProfileInfos;
