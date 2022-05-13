import { Button, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import img from '../images/background-login.jpg';

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

  createUserProfile = (event) => {
    event.preventDefault();

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

  render() {
    const { loading, shouldRedirect, isButtonDisabled } = this.state;

    return (
      <Box data-testid="page-login">
        { loading
          ? <Loading />
          : (
            <Box
              sx={ {
                display: 'flex',
                height: '100vh',
                justifyContent: 'space-between',
                width: '100vw',
              } }
            >
              <Box
                sx={ {
                  display: 'flex',
                  flexGrow: '2',
                  height: '110px',
                  justifyContent: 'center',
                  margin: 'auto 0',
                } }
              >
                <form
                  style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  } }
                  onSubmit={ this.createUserProfile }
                >
                  <Box
                    sx={ {
                      alignItems: 'flex-end',
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '0 auto',
                      width: 300,
                    } }
                  >
                    <AccountCircle sx={ { color: 'action.active', mr: 1, my: 0.5 } } />
                    <TextField
                      id="input-with-sx"
                      label="Name"
                      name="name"
                      fullWidth
                      variant="standard"
                      // Trecho baseado no link:
                      // Link: https://stackoverflow.com/questions/62049553/how-to-use-test-id-in-material-ui-textfield
                      inputProps={ { 'data-testid': 'login-name-input' } }
                      onChange={ this.handleChange }
                    />
                  </Box>
                  <Button
                    color="secondary"
                    data-testid="login-submit-button"
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={ isButtonDisabled }
                  >
                    Entrar
                  </Button>
                </form>
              </Box>
              <Box
                sx={ {
                  display: 'inline-block',
                  backgroundImage: `url(${img})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  height: '100%',
                  width: '70%',
                } }
              />
            </Box>
          ) }
        { shouldRedirect && <Redirect to="/search" /> }
      </Box>
    );
  }
}

export default Login;
