import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      songsSaved: [],
      checkedInputs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getSavedSongs();
  }

  getSavedSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      loading: true,
    }, () => {
      this.setState({
        checkedInputs: [...favoriteSongs.map(({ trackId }) => trackId)],
        songsSaved: [...favoriteSongs],
        loading: false,
      });
    });
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
      const savedSongs = await getFavoriteSongs();

      this.setState({
        loading: false,
        songsSaved: [...savedSongs],
      });
    });
  }

  render() {
    const { headerNavValue, setNavValue, history } = this.props;
    const { songsSaved, checkedInputs, loading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header
          headerNavValue={ headerNavValue }
          setNavValue={ setNavValue }
          history={ history }
        />
        {loading ? <Loading />
          : (
            <section>
              <h1>Músicas favoritas:</h1>
              {songsSaved.map((track) => (
                <MusicCard
                  key={ track.trackId }
                  checkedInputs={ checkedInputs }
                  track={ track }
                  favoriteFunc={ this.handleFavoriteSongs }
                />
              ))}
            </section>
          ) }
      </div>
    );
  }
}

export default Favorites;
