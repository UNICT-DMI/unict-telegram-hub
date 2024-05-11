'use client';

import { Entity, entityTypes } from '@/models/api/Entity';
import { Box } from '@mui/material';
import { useState } from 'react';
import { loadCards } from './actions';
import GenericCard from './card';
import Toolbox from './toolbox';

export default function TelegramDashboard() {
  let [data, setData] = useState<ReadonlyArray<Entity>>();

  async function fetchData(chosenEntityType: (typeof entityTypes)[number]) {
    setData(await loadCards(chosenEntityType));
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(min(25em, 100%), 1fr))"
      gap={1}>
      <Toolbox setChosenEntityType={fetchData} />
      {data?.map((entity, i) => (
        <GenericCard
          key={entity.title}
          isLeaderboard={true}
          entity={{ ...entity, position: i + 1 }}
        />
      ))}
    </Box>
  );
}
