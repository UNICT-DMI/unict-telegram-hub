'use client';

import { Box, TextField, Typography } from '@mui/material';
import { createContext, useState } from 'react';

export const GlobalSearchContext = createContext<string>('');

export default function SearchConsumer({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <GlobalSearchContext.Provider value={searchValue}>
      <header className="header">
        <Box display="flex" justifyContent="space-between" alignItems="center" marginRight={1}>
          <Typography variant="h1">UNICT Hub</Typography>
          <TextField
            label="Search"
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
