import { Divider, List, Stack } from '@mui/material';
import React, { Component } from 'react';
import MusicCard from './MusicCard';

export class MusicList extends Component {
  render() {
    const { tracks, checkedInputs, handleFavoriteSongs } = this.props;

    return (
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
        <Stack
          direction="column"
          divider={ <Divider orientation="horizontal" flexItem /> }
        >
          {tracks.map((song) => (
            <MusicCard
              key={ song.trackId }
              checkedInputs={ checkedInputs }
              track={ song }
              favoriteFunc={ handleFavoriteSongs }
            />
          ))}
        </Stack>
      </List>
    );
  }
}

export default MusicList;
