import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  /* Trecho baseado nos links abaixo para resolver o warning: memory leak
  link: https://www.debuggr.io/react-update-unmounted-component/
  link: https://github.com/material-components/material-components-web-react/issues/434
  */
  hasMounted = false;

  constructor() {
    super();

    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
      shouldRedirect: false,
    };
  }

  componentDidUpdate() {
    this.hasMounted = true;
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      const { name: profileName } = this.state;

      this.setState({
        isButtonDisabled: profileName.length <= 2,
      });
    });
  }

  createUserProfile = () => {
    const { name } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });

      if (this.hasMounted) {
        this.setState({
          shouldRedirect: true,
        });
      }
    });
  }

  renderForm = () => {
    const { isButtonDisabled } = this.state;

    return (
      <form>
        <input
          data-testid="login-name-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={ this.handleChange }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.createUserProfile }
        >
          Entrar
        </button>
      </form>
    );
  }

  render() {
    const { loading, shouldRedirect } = this.state;

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : this.renderForm() }
        { shouldRedirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
