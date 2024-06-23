'use client';

import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Inter } from 'next/font/google';
import './globals.css';
import Main from './main';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme(prefersDarkMode)}>
            <CssBaseline />
            <Main>{children}</Main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
