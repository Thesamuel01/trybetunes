import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      artistMusics: [],
      requisitionEnds: false,
      checkedInputs: [],
    };
  }

  componentDidMount() {
    this.getArtistSongs();
  }

  getArtistSongs = async () => {
    const { match: { params: { id } } } = this.props;

    const musics = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      loading: true,
    }, () => {
      this.setState({
        checkedInputs: [...favoriteSongs.map(({ trackId }) => trackId)],
        artistMusics: [...musics],
        requisitionEnds: true,
        loading: false,
      });
    });
  }

  renderTracks = () => {
    const { artistMusics: [artistInfo, ...tracks], checkedInputs } = this.state;
    const { artworkUrl100, artistName, collectionName } = artistInfo;

    const tracksElements = (
      <section>
        <div>
          <img
            src={ artworkUrl100 }
            alt={ `Foto album ${collectionName} da cantor ${artistName}` }
          />
          <h2 data-testid="album-name">{collectionName}</h2>
          <p data-testid="artist-name">{artistName}</p>
        </div>
        <ul>
          {tracks.map((song) => (
            <MusicCard
              key={ song.trackId }
              checkedInputs={ checkedInputs }
              track={ song }
              favoriteFunc={ this.addFavorite }
            />
          ))}
        </ul>
      </section>
    );

    return tracksElements;
  }

  addFavorite = (track, callback) => {
    this.setState(({ checkedInputs }) => {
      const { trackId } = track;
      const isToRemove = checkedInputs.some((id) => id === trackId);
      const newArray = isToRemove
        ? checkedInputs.filter((id) => id !== trackId) : [...checkedInputs, trackId];

      return ({
        checkedInputs: [...newArray],
        loading: true,
      });
    }, async () => {
      await callback(track);

      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { requisitionEnds, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (requisitionEnds && this.renderTracks())}
      </div>
    );
  }
}

Album.propTypes = {
  /* Trecho baseado nos links abaixo, para fazer a validacao de props objeto.
    Links:
    - https://stackoverflow.com/questions/46484026/eslint-react-router-v4-how-to-validate-match-params-props
    - https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  */
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
