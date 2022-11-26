import { colors } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import type { NextPage } from 'next';
import Hub from './[submodule]';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Home: NextPage = () => {
  return <Hub />;
};

export default Home;

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.yellow[700]
    },
    secondary: {
      main: colors.indigo[900]
    },
    text: {
      secondary: colors.yellow[900]
    }
  }
});
