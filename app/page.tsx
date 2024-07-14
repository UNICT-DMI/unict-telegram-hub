'use client';

import { Entity, entities } from '@/app/models';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadCards } from './actions';
import GenericCard from './card';
import { useDebounce } from './hooks';
import { CategoryContext, SearchContext, defaultSearchValue } from './main';

export default function TelegramDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ReadonlyArray<Entity>>([]);
  const theme = useTheme();
  const category = useContext(CategoryContext);
  const searchValue = useContext(SearchContext);

  const debouncedLoading = useDebounce(loading, loading, 500);
  const debouncedSearchValue = useDebounce(defaultSearchValue, searchValue, 500);

  const fetchData = useCallback(
    async (chosenEntityType: (typeof entities)[number]) => {
      setLoading(true);
      setData(await loadCards(chosenEntityType, debouncedSearchValue));
      setLoading(false);
    },
    [debouncedSearchValue]
  );

  useEffect(() => {
    fetchData(category);
  }, [fetchData, category]);

  const cards = useMemo(() => {
    if (debouncedLoading) {
      return new Array(20)
        .fill(undefined)
        .map((_, i) => <Skeleton key={i} variant="rectangular" height="160px" animation="pulse" />);
    }

    return data.map(
      (entity, i) =>
        (debouncedSearchValue.length === 0 ||
          entity.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())) && (
          <GenericCard
            key={`${entity.title}${i}`}
            isLeaderboard={debouncedSearchValue.length === 0}
            entity={{ ...entity, position: i + 1 }}
          />
        )
    );
  }, [debouncedLoading, data, debouncedSearchValue]);

  if (cards.length > 0) {
    return (
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(min(25em, 100%), 1fr))"
        gap={2}
        margin={1}
        bgcolor={theme.palette.background.default}>
        {cards}
      </Box>
    );
  } else {
    return (
      <Box textAlign="center">
        <Typography fontSize="2rem">
          {debouncedSearchValue.length > 0 ? `No matches for "${debouncedSearchValue}"` : 'No data'}
        </Typography>
        <Typography fontSize="3rem">😕</Typography>
      </Box>
    );
  }
}
