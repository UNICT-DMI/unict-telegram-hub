import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>UNICT Telegram Channels & Groups</title>
        <meta name='description' content='UNICT Telegram Channels & Groups' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </>
  );
};

export default Home;
