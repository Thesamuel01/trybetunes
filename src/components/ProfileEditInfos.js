import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardContent, TextField } from '@mui/material';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEditInfos extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      email: '',
      image: '',
      isButtonDisable: true,
      loading: true,
    };
  }

  async componentDidMount() {
    const { name, description, email, image } = await getUser();

    this.setState({
      name,
      description,
      email,
      image,
      loading: false,
    }, () => {
      this.validateInputs();
    });
  }

  validateInputs = () => {
    const EMAIL_REGEX = /^[A-Z0-9]+@[A-Z]+.com/i;

    const { name: profileName, description, email, image } = this.state;

    const isNameValid = profileName !== '';
    const isDescriptionValid = description !== '';
    const isEmailValid = email !== '' && EMAIL_REGEX.test(email);
    const isImageValid = image !== '';
    const isInputsValid = isNameValid
      && isDescriptionValid && isEmailValid && isImageValid;

    this.setState({
      isButtonDisable: !isInputsValid,
    });
  }

  saveUserInfos = (event) => {
    event.preventDefault();

    const { name, description, email, image } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      await updateUser({ name, description, email, image });

      history.push('/profile');
    });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateInputs();
    });
  }

  render() {
    const { name, description, email, image, isButtonDisable,
      loading } = this.state;

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
          {!loading
            ? (
              <form onSubmit={ this.saveUserInfos }>
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
                    onChange={ this.handleInputChange }
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
                    onChange={ this.handleInputChange }
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
                    onChange={ this.handleInputChange }
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
                    onChange={ this.handleInputChange }
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
                      disabled={ isButtonDisable }
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
  }
}

ProfileEditInfos.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProfileEditInfos;
