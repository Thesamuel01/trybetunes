import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      // artistName: '',
      isButtonDisabled: true,
    };
  }

  enableButton = (name) => {
    this.setState({
      isButtonDisabled: name.length < 2,
    });
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.enableButton(value);

    // this.setState({
    //   artistName: value,
    // });
  }

  render() {
    const { isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome de Artista"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            type="button"
          >
            Pesquisar
          </button>
        </section>
      </div>
    );
  }
}

export default Search;
