import React, { Component } from 'react';
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
      </div>
    );

    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : headerElements}
        <div>
          <input type="text" />
          <button type="button">
            Search
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
