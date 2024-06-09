'use client';

import { Entity, entities } from '@/app/models';
import { Box, Skeleton, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { CategoryContext, SearchContext } from './main';
import { loadCards } from './actions';
import GenericCard from './card';

export default function TelegramDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ReadonlyArray<Entity>>();
  const theme = useTheme();
  const category = useContext(CategoryContext);
  const searchValue = useContext(SearchContext);

  useEffect(() => {
    fetchData(category);
  }, [category]);

  async function fetchData(chosenEntityType: (typeof entities)[number]) {
    setLoading(true);
    setData(await loadCards(chosenEntityType));
    setLoading(false);
  }

  function listEntities() {
    if (loading) {
      return new Array(20)
        .fill(undefined)
        .map((_, i) => <Skeleton key={i} variant="rectangular" height="160px" animation="pulse" />);
    }

    if (data !== undefined) {
      return data.map(
        (entity, i) =>
          (searchValue.length === 0 ||
            entity.title.toLowerCase().includes(searchValue.toLowerCase())) && (
            <GenericCard
              key={`${entity.title}${i}`}
              isLeaderboard={searchValue.length === 0}
              entity={{ ...entity, position: i + 1 }}
            />
          )
      );
    }
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(min(25em, 100%), 1fr))"
      gap={2}
      margin={1}
      bgcolor={theme.palette.background.default}>
      {listEntities()}
    </Box>
  );
}
