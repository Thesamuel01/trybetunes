import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, ListItem, ListItemText } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box } from '@mui/system';
import { updateFavoritedSongs } from '../redux/features/musics/musicSlice';

const MusicCard = ({ track }) => {
  const dispatch = useDispatch();
  const { checkedInputs, status } = useSelector((state) => state.music);
  const { trackId, trackName, previewUrl, artworkUrl60 } = track;

  const handleCheckbox = ({ target }) => {
    const action = target.checked ? 'add' : 'remove';

    dispatch(updateFavoritedSongs({ track, action }));
  };

  return (
    <Box>
      {
        status !== 'loading'
          && (
            <ListItem button divider>
              <Box
                sx={ {
                  marginRight: '1rem',
                } }
              >
                <img src={ artworkUrl60 } alt={ `Imagem do album ${trackName}` } />
              </Box>
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
                onChange={ handleCheckbox }
              />
            </ListItem>
          )
      }
    </Box>
  );
};

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
