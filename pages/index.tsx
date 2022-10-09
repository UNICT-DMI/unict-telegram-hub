import { colors, createTheme } from '@mui/material';
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
      main: colors.yellow[900]
    },
    secondary: {
      main: colors.indigo[900]
    }
  }
});

interface Route {
  label: string;
  href: string;
}

export const routes: readonly Route[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'UNICT Channels',
    href: 'channels'
  },
  {
    label: 'UNICT Bots',
    href: 'bots'
  },
  {
    label: "DMI Bachelor's Degree Groups",
    href: 'bachelor'
  },
  {
    label: "DMI Master's Degree Groups",
    href: 'master'
  }
] as const;
