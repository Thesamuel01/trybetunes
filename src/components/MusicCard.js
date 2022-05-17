import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, ListItem, ListItemText } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
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
      <ListItem>
        <ListItemText primary={ trackName } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <Checkbox
          color="error"
          id={ `${trackId}` }
          inputProps={ { name: 'favorite' } }
          icon={ <FavoriteBorder /> }
          checkedIcon={ <Favorite /> }
          checked={ checkedInputs.some((id) => id === trackId) }
          onChange={ this.handleCheckbox }
        />
      </ListItem>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  favoriteFunc: PropTypes.func.isRequired,
  checkedInputs: PropTypes
    .arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default MusicCard;
