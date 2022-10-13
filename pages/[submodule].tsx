import { CssBaseline, ThemeProvider } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { theme } from '.';
import AppBarWrapper from '../components/AppBar/appbar';
import Channels from '../components/Channels/Channels';
import Footer from '../components/Footer/footer';
import styles from '../styles/Hub.module.css';

const Hub: NextPage = () => {
  const router = useRouter();
  const { submodule } = router.query;
  const [filter, setFilter] = useState<string | undefined>(undefined);

  function getSubmodule() {
    switch (submodule) {
      case 'channels':
        return <Channels filter={filter} />;
      default:
        return undefined;
    }
  }

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
          <AppBarWrapper setFilter={setFilter} />

          {getSubmodule()}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Hub;

export type FilterSetter = {
  setFilter: ReturnType<typeof useState<string>>[1];
};
