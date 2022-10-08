import type { NextPage } from 'next';
import Head from 'next/head';

import Hub from './[submodule]';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>UNICT Telegram Hub</title>
        <meta name='description' content='UNICT Telegram Hub' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Hub />
    </>
  );
};

export default Home;

export type Routes = 'channels' | 'groups' | 'bachelor' | 'master' | 'bots';
