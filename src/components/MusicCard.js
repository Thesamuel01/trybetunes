import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  handleCheckbox = ({ target }) => {
    const { track, favoriteFunc } = this.props;

    if (target.checked) {
      favoriteFunc(track, addSong);
    } else {
      favoriteFunc(track, removeSong);
    }
  };

  render() {
    const { track: { trackId, trackName, previewUrl }, checkedInputs } = this.props;

    return (
      <li>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `${trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checkedInputs.some((id) => id === trackId) }
            id={ `${trackId}` }
            name="favorite"
            type="checkbox"
            onChange={ this.handleCheckbox }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  favoriteFunc: PropTypes.func.isRequired,
  checkedInputs: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
