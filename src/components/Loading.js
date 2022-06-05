import React from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

const Loading = () => (
  <Container
    sx={ {
      height: '100%',
    } }
  >
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '100px',
      } }
    >
      <CircularProgress color="secondary" />
    </Box>
  </Container>
);

export default Loading;
