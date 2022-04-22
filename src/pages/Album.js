import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      artistMusics: [],
      requisitionEnds: false,
    };
  }

  componentDidMount() {
    this.getArtistSongs();
  }

  getArtistSongs = async () => {
    const { match: { params: { id } } } = this.props;

    const musics = await getMusics(id);
    this.setState({
      loading: true,
    }, () => {
      this.setState({
        artistMusics: [...musics],
        requisitionEnds: true,
        loading: false,
      });
    });
  }

  renderTracks = () => {
    const { artistMusics: [artistInfo, ...tracks] } = this.state;
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
          {tracks.map(({ trackId, trackName, previewUrl }) => (
            <MusicCard
              key={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />
          ))}
        </ul>
      </section>
    );

    return tracksElements;
  }

  render() {
    const { requisitionEnds, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        {requisitionEnds && this.renderTracks()}
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
