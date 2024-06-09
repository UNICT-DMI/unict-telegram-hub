'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffcc18'
    },
    secondary: {
      main: '#c9a227'
    },
    error: {
      main: '#de5935'
    }
  },
  typography: {
    h1: {
      fontSize: '3rem'
    }
  }
});

export default theme;
