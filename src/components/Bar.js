import { AppBar } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import MenuBar from './MenuBar';

class Bar extends Component {
  render() {
    const { toggleColorMode, mode } = this.props;

    return (
      <Box
        sx={ {
          padding: '1rem',
        } }
      >
        <AppBar
          position="static"
          color="secondary"
        >
          <Box
            sx={ {
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: '1rem',
            } }
          >
            TrybeTunes
            {/* <Stack direction="row" spacing={ 1 }>
              <Chip
                avatar={ <Avatar>{userName[0].toUpperCase()}</Avatar> }
                label={ userName }
              />
            </Stack> */}
            <MenuBar
              toggleColorMode={ toggleColorMode }
              mode={ mode }
            />
          </Box>
        </AppBar>
      </Box>
    );
  }
}

export default Bar;
