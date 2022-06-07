import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, ListItemButton, ListItemText } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box } from '@mui/system';
import {
  startPlayMusic, updateFavoritedSongs,
} from '../redux/features/musics/musicSlice';

const MusicCard = ({ track }) => {
  const dispatch = useDispatch();
  const {
    checkedInputs, status, startPlaying,
    currentSongPlaying: { trackId: songPlaying },
  } = useSelector((state) => state.music);
  const { trackId, trackName, artworkUrl60 } = track;

  const handleCheckbox = ({ target }) => {
    const action = target.checked ? 'add' : 'remove';

    dispatch(updateFavoritedSongs({ track, action }));
  };

  return (
    <Box>
      {
        status !== 'loading'
          && (
            <ListItemButton
              divider
              selected={ songPlaying === trackId && startPlaying }
              onClick={ () => dispatch(startPlayMusic({ play: true, trackId })) }
              sx={ {
                '&.Mui-selected': {
                  bgcolor: 'rgba(186, 104, 200, 0.08)',
                },
                '&.Mui-selected:hover': {
                  bgcolor: 'rgba(186, 104, 200, 0.08)',
                },
              } }
            >
              <Box
                sx={ {
                  marginRight: '1rem',
                } }
              >
                <img src={ artworkUrl60 } alt={ `Imagem do album ${trackName}` } />
              </Box>
              <ListItemText primary={ trackName } />
              <Checkbox
                color="error"
                id={ `${trackId}` }
                inputProps={ { name: 'favorite' } }
                icon={ <FavoriteBorder /> }
                checkedIcon={ <Favorite /> }
                checked={ checkedInputs.some((id) => id === trackId) }
                onChange={ handleCheckbox }
              />
            </ListItemButton>
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
