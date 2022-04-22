import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.updateUserName();
  }

  updateUserName = async () => {
    const { name } = await getUser();

    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    const headerElements = (
      <div>
        Cabecalho
        <div>
          <span data-testid="header-user-name">{ userName }</span>
        </div>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritas
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </nav>
      </div>
    );

    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : headerElements}
      </header>
    );
  }
}

export default Header;
