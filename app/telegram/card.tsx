'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Channel, Entity, EntityWithPosition, Group } from './models';

export default function GenericCard({
  isLeaderboard,
  entity
}: Readonly<{
  isLeaderboard: boolean;
  entity: EntityWithPosition;
}>) {
  const fans = getFans(entity);

  return (
    <Box position="relative">
      <Card
        sx={{
          container: 'card / inline-size',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          height: 'calc(100% - 16px)'
        }}>
        <CardMedia
          component="img"
          src={entity.pictureURL ?? '/telegram.svg'}
          sx={{
            width: '30cqw',
            alignSelf: 'center'
          }}
        />
        <CardContent>
          <Link href={entity.link} target="_blank" rel="noreferrer" variant="h5" underline="hover">
            {entity.title}
          </Link>
          {entity.description !== undefined ? (
            <Typography variant="body2">{entity.description}</Typography>
          ) : undefined}
          {fans !== undefined ? <Typography variant="body2">{fans}</Typography> : undefined}
          {isGroup(entity) ? (
            <>
              {entity.code ? (
                <Typography variant="body2">Code: {entity.code}</Typography>
              ) : undefined}
              {entity.mz_code ? (
                <Typography variant="body2">M-Z Code: {entity.mz_code}</Typography>
              ) : undefined}
            </>
          ) : undefined}
        </CardContent>
      </Card>
      {isLeaderboard ? (
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px'
          }}>
          {entity.position <= 3 ? (
            <Box sx={{ width: 20, height: 30 }}>
              <Image
                src={`/medal_${entity.position}.svg`}
                layout="fill"
                alt="Medal corresponding to position"
              />
            </Box>
          ) : (
            <Box
              width="1.8em"
              height="1.8em"
              borderRadius="50%"
              bgcolor="lightblue"
              display="flex"
              justifyContent="center"
              alignItems="center">
              {entity.position}
            </Box>
          )}
        </Box>
      ) : undefined}
    </Box>
  );
}

function isChannel(entity: Entity): entity is Channel {
  return (entity as Channel).subscribers != undefined;
}

function isGroup(entity: Entity): entity is Group {
  return (entity as Group).members != undefined;
}

function getFans(entity: Entity): undefined | string {
  if (isChannel(entity) && entity.subscribers >= 0) {
    return `Subscribers: ${entity.subscribers}`;
  }
  if (isGroup(entity) && entity.members >= 0) {
    return `Members: ${entity.members}`;
  }

  return undefined;
}
