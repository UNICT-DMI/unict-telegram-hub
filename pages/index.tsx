import { colors } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import type { NextPage } from 'next';
import Hub from './[submodule]';
import Route from '../models/Route';

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

export const routes: Route[] = [
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
    href: 'bachelor',
    subRoutes: [
      {
        label: '1° anno',
        href: '',
        queryParameters: {
          year: '1'
        }
      },
      {
        label: '2° anno',
        href: '',
        queryParameters: {
          year: '2'
        }
      },
      {
        label: '3° anno',
        href: '',
        queryParameters: {
          year: '3'
        }
      }
    ]
  },
  {
    label: "DMI Master's Degree Groups",
    href: 'master',
    subRoutes: [
      {
        label: '1° anno',
        href: '',
        queryParameters: {
          year: '1'
        }
      },
      {
        label: '2° anno',
        href: '',
        queryParameters: {
          year: '2'
        }
      }
    ]
  }
];
