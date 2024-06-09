'use client';

import { Box, TextField, Typography } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import CategorySelector from './categorySelector';
import { entities } from './models';

const defaultCategory: (typeof entities)[number] = 'channels';

export const CategoryContext = createContext<(typeof entities)[number]>(defaultCategory);
export const SearchContext = createContext<string>('');

export default function Main({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [category, setCategory] = useState<(typeof entities)[number]>(defaultCategory);
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
    <CategoryContext.Provider value={category}>
      <SearchContext.Provider value={searchValue}>
        <header className="header">
          <Box
            display="flex"
            alignItems="center"
            margin={1}
            marginLeft={0.5}
            gap={1}
            justifyContent="space-between"
            flexWrap="wrap">
            <Typography variant="h1">UNICT Telegram Hub</Typography>
            <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
              <CategorySelector
                defaultEntityType={defaultCategory}
                onChange={input => {
                  setCategory(input);
                }}
              />
              <TextField
                label="Search"
                value={searchValue}
                onChange={input => {
                  setSearchValue(input.target.value);
                }}
              />
            </Box>
          </Box>
        </header>
        <main className="main">{children}</main>
      </SearchContext.Provider>
    </CategoryContext.Provider>
  );
}
