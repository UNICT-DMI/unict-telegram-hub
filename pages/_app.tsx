import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>UNICT Telegram Hub</title>
        <meta name="description" content="UNICT Telegram Hub" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="application-name" content="UNICT Telegram Hub" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UNICT Telegram Hub" />
        <meta name="description" content="UNICT Telegram Hub" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <link rel="icon" type="image/png" sizes="16x16" href="/icons/16px.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/32px.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="UNICT Telegram Hub" />
        <meta property="og:description" content="UNICT Telegram Hub" />
        <meta property="og:site_name" content="UNICT Telegram Hub" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
