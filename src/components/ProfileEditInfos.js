import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <section>
        {loading
          ? <Loading />
          : (
            <form onSubmit={ this.saveUserInfos }>
              <div>
                <img
                  src={ image }
                  alt={ `Imagem de ${name}` }
                />
                <input
                  data-testid="edit-input-image"
                  type="text"
                  id="profileImage"
                  name="image"
                  value={ image }
                  onChange={ this.handleInputChange }
                />
              </div>
              <label htmlFor="profileName">
                Name
                <input
                  data-testid="edit-input-name"
                  type="text"
                  id="profileName"
                  name="name"
                  value={ name }
                  onChange={ this.handleInputChange }
                />
              </label>
              <label htmlFor="profileEmail">
                Email
                <input
                  data-testid="edit-input-email"
                  type="text"
                  id="profileEmail"
                  name="email"
                  value={ email }
                  onChange={ this.handleInputChange }
                />
              </label>
              <label htmlFor="profileDescription">
                Descrição
                <input
                  data-testid="edit-input-description"
                  type="textarea"
                  id="profileDescription"
                  name="description"
                  value={ description }
                  onChange={ this.handleInputChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ isButtonDisable }
              >
                Salvar
              </button>
            </form>
          ) }
      </section>
    );
  }
}

ProfileEditInfos.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProfileEditInfos;
