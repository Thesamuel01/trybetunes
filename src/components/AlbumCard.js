import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends Component {
  render() {
    const { albumImage, albumName, artistFullName, albumId } = this.props;

    return (
      <div>
        <img src={ albumImage } alt={ `Imagem do album: ${albumName}` } />
        <Link
          to={ `/album/${albumId}` }
          data-testid={ `link-to-album-${albumId}` }
        >
          {albumName}
        </Link>
        <p>{artistFullName}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumImage: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistFullName: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
};

export default AlbumCard;
