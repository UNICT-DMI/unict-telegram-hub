import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import type { NextPage } from 'next';
import Head from 'next/head';
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

      <Head>
        <title>UNICT Telegram Hub</title>
        <meta name='description' content='UNICT Telegram Hub' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
