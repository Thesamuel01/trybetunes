import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const SkeletonAlbums = () => {
  const renderSkeletons = () => {
    let skeletons = [];
    const NUMBER_OF_SKELETONS = 12;

    for (let index = 0; index < NUMBER_OF_SKELETONS; index += 1) {
      const element = (
        <Grid
          key={ index }
          container
          item
          justifyContent="center"
          xs={ 12 }
          sm={ 6 }
          md={ 4 }
          lg={ 3 }
          xl={ 2 }
        >
          <Skeleton
            key={ index }
            animation="wave"
            variant="rectangular"
            sx={ {
              width: '300px',
              height: '500px',
            } }
          />
        </Grid>
      );

      skeletons = [...skeletons, element];
    }

    return skeletons;
  };

  return (
    <Box sx={ { padding: '0 2rem' } }>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="350px"
        height="36px"
        sx={ { margin: '1rem 0' } }
      />
      <Grid
        container
        spacing={ 2 }
        sx={ { marginTop: 2 } }
      >
        {renderSkeletons()}
      </Grid>
    </Box>
  );
};

export default SkeletonAlbums;
