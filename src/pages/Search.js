import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      artistSearched: '',
      isButtonDisabled: true,
      loading: false,
      artistsAlbums: [],
      requisitionEnd: false,
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

    this.setState({
      inputValue: value,
    });
  }

  getArtist = () => {
    const { inputValue } = this.state;

    this.setState(({ inputValue: input }) => ({
      loading: true,
      artistSearched: input,
      inputValue: '',
      requisitionEnd: false,
    }), async () => {
      const albums = await searchAlbumsAPI(inputValue);

      this.setState({
        artistsAlbums: [...albums],
        loading: false,
        requisitionEnd: true,
      });
    });
  }

  render() {
    const {
      artistsAlbums, artistSearched, isButtonDisabled,
      inputValue, loading, requisitionEnd,
    } = this.state;
    const albumsElements = (
      <section>
        <h2>{`Resultado de álbuns de: ${artistSearched}`}</h2>
        { artistsAlbums.length === 0
          ? <p>Nenhum álbum foi encontrado</p>
          : (
            <div>
              { artistsAlbums.map(
                ({ artistName, collectionId, collectionName, artworkUrl100 }) => (
                  <AlbumCard
                    key={ collectionId }
                    albumImage={ artworkUrl100 }
                    albumName={ collectionName }
                    artistFullName={ artistName }
                    albumId={ collectionId }
                  />
                ),
              )}
            </div>
          )}
      </section>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <input
            data-testid="search-artist-input"
            type="text"
            placeholder="Nome de Artista"
            value={ inputValue }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.getArtist }
          >
            Pesquisar
          </button>
          {loading && <Loading />}
          {requisitionEnd && albumsElements}
        </section>
      </div>
    );
  }
}

export default Search;
