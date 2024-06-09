'use client';

import { Box, TextField, Typography } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

export const GlobalSearchContext = createContext<string>('');

export default function SearchConsumer({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const eventType = 'keydown';
    const eventListener = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        setSearchValue('');
      }
    };

    addEventListener(eventType, eventListener);

    return () => {
      removeEventListener('keydown', eventListener);
    };
  }, []);

  return (
    <GlobalSearchContext.Provider value={searchValue}>
      <header className="header">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          margin={1}
          marginLeft={0.5}>
          <Typography variant="h1">UNICT Telegram Hub</Typography>
          <TextField
            label="Search"
            value={searchValue}
            onChange={input => {
              setSearchValue(input.target.value);
            }}
          />
        </Box>
      </header>
      <main className="main">{children}</main>
    </GlobalSearchContext.Provider>
  );
}
