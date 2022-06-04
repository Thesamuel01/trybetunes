import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, List, Stack } from '@mui/material';
import MusicCard from './MusicCard';

const MusicList = () => {
  const { musics } = useSelector((state) => state.music);

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
        {musics.map((song) => (
          <MusicCard
            key={ song.trackId }
            track={ song }
          />
        ))}
      </Stack>
    </List>
  );
};

export default MusicList;
