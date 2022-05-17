import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, List, Typography } from '@mui/material';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Box, width } from '@mui/system';

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
      <Grid
        container
        justifyContent="center"
        sx={ {
          margin: '5rem auto 0 auto',
        } }
      >
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          xl={ 4 }
          sx={ {
            minHeight: 360,
            minWidth: 300,
            marginBottom: '2rem',
          } }
        >
          <img
            src={ artworkUrl100 }
            alt={ `Foto album ${collectionName} da cantor ${artistName}` }
            style={ {
              minWidth: 300,
            } }
          />
          <Typography
            gutterBottom
            variant="h2"
            component="div"
            sx={ {
              fontWeight: 600,
              fontSize: '2rem',
              margin: '1rem 0',
            } }
          >
            {collectionName}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={ {
              margin: '.6rem 0',
            } }
          >
            {artistName}
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          xl={ 4 }
          sx={ {
            width: '80%',
            minWidth: 350,
          } }
        >
          <List
            sx={ {
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 500,
              '& ul': { padding: 0 },
            } }
          >
            {tracks.map((song) => (
              <MusicCard
                key={ song.trackId }
                checkedInputs={ checkedInputs }
                track={ song }
                favoriteFunc={ this.handleFavoriteSongs }
              />
            ))}
          </List>
        </Grid>
      </Grid>
    );

    return tracksElements;
  }

  handleFavoriteSongs = (track, callback) => {
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
    const { headerNavValue, setNavValue, history } = this.props;
    const { requisitionEnds, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header
          headerNavValue={ headerNavValue }
          setNavValue={ setNavValue }
          history={ history }
        />
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
