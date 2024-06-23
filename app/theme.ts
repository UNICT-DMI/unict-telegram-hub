'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffb703'
    },
    secondary: {
      main: '#219ebc'
    },
    error: {
      main: '#de5935'
    }
  },
  typography: {
    h1: {
      fontSize: '3rem'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 0px 3px 0px rgba(0,0,0,0.12)'
        }
      }
    }
  }
});

export default theme;
