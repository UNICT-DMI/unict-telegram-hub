'use client';

import { Box, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import { createContext, useEffect, useState } from 'react';
import CategorySelector from './categorySelector';
import { entities } from './models';

const defaultCategory: (typeof entities)[number] = 'channels';
export const defaultSearchValue: string = '';

export const CategoryContext = createContext<(typeof entities)[number]>(defaultCategory);
export const SearchContext = createContext<string>(defaultSearchValue);

export default function Main({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [category, setCategory] = useState<(typeof entities)[number]>(defaultCategory);
  const [searchValue, setSearchValue] = useState<string>('');
  const theme = useTheme();

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
        <Box
          display="flex"
          alignItems="center"
          padding={2}
          paddingInline={0.5}
          paddingRight={1}
          gap={1}
          justifyContent="space-between"
          flexWrap="wrap"
          position="sticky"
          top={0}
          zIndex={1}
          bgcolor={theme.palette.background.default}>
          <Tooltip title="Made by students for students 💛" placement="right">
            <Typography variant="h1" color={theme.palette.primary.main}>
              UNICT Telegram Hub
            </Typography>
          </Tooltip>
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
        <main>{children}</main>
      </SearchContext.Provider>
    </CategoryContext.Provider>
  );
}
