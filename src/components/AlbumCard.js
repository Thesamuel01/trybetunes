import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

class AlbumCard extends Component {
  render() {
    const { albumImage, albumName, artistFullName, albumId } = this.props;

    return (
      <Card sx={{ width: 300, height: 500 }}>
        <CardActionArea>
          <Link
            to={ `/album/${albumId}` }
            data-testid={ `link-to-album-${albumId}` }
            style={ {
              textDecoration: 'none',
              color: '#121212',
            } }
          >
            <CardMedia
              component="img"
              height="300"
              image={ albumImage }
              alt={ `Imagem do album: ${albumName}` }
            />
            <CardContent sx={ { height: 200 } }>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={ {
                  fontWeight: 600,
                  fontSize: '1.1rem',
                } }
              >
                {albumName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {artistFullName}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
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
