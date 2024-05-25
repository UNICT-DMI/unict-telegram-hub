'use client';

import { Entity, entities } from '@/app/telegram/models';
import { Box, Skeleton } from '@mui/material';
import { useState } from 'react';
import { loadCards } from './actions';
import GenericCard from './card';
import Toolbox from './toolbox';

export default function TelegramDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ReadonlyArray<Entity>>();

  async function fetchData(chosenEntityType: (typeof entities)[number]) {
    setLoading(true);
    setData(await loadCards(chosenEntityType));
    setLoading(false);
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(min(25em, 100%), 1fr))"
      gap={2}
      margin={1}>
      <Toolbox setChosenEntityType={fetchData} />
      {loading
        ? new Array(20)
            .fill(undefined)
            .map((_, i) => (
              <Skeleton key={i} variant="rectangular" height="160px" animation="pulse" />
            ))
        : data?.map((entity, i) => (
            <GenericCard
              key={`${entity.title}${i}`}
              isLeaderboard={true}
              entity={{ ...entity, position: i + 1 }}
            />
          ))}
    </Box>
  );
}
