import { Box, CircularProgress, Container } from '@mui/material';
import React, { Component } from 'react';
import '../index.css';

class Loading extends Component {
  render() {
    return (
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
  }
}

export default Loading;
