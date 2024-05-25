'use client';

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
  }
});

export default theme;
