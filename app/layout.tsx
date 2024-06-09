import { Box, CssBaseline, Link, ThemeProvider, Typography } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import './globals.css';
import SearchConsumer from './searchConsumer';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UNICT Telegram Hub',
  description: 'The platform to find out all the telegram links associated to UNICT'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SearchConsumer>{children}</SearchConsumer>
            <footer className="footer">
              <Box display="flex" justifyContent="space-between" margin={0.5} marginInline={1}>
                <Typography>Made by students for students 💛</Typography>
                <Link
                  rel="noreferrer"
                  target="_blank"
                  href={'https://github.com/UNICT-DMI/unict-telegram-hub'}>
                  <Image src="/github-mark.svg" alt="The Github logo" width={24} height={24} />
                </Link>
              </Box>
            </footer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
