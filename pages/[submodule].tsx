import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { theme } from '.';
import AppBarWrapper from '../components/AppBar/Appbar';
import Footer from '../components/Footer/Footer';
import Grid from '../components/Grid/Grid';
import Home from '../components/Home/Home';
import styles from '../styles/Hub.module.css';

const Hub: NextPage = () => {
  const router = useRouter();
  const submodule = router.asPath;
  const [filter, setFilter] = useState<string | undefined>(undefined);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className={styles.container}>
        <main className={styles.main}>
          <AppBarWrapper filteringEnabled={submodule !== '/'} setFilter={setFilter} />

          {submodule !== '/' ? <Grid submodule={submodule} filter={filter} /> : <Home />}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Hub;
