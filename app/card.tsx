'use client';

import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Channel, Entity, EntityWithPosition, Group } from './models';

const leaderboardTop3PositionSize = '1.8em';
const leaderboardPositionSize = '1.5em';

export default function GenericCard({
  isLeaderboard,
  entity
}: Readonly<{
  isLeaderboard: boolean;
  entity: EntityWithPosition;
}>) {
  const theme = useTheme();
  const fans = getFans(entity);

  return (
    <Box position="relative">
      <Card
        sx={{
          container: 'card / inline-size',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
          height: '100%'
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
          {entity.link.length > 0 ? (
            <Link href={entity.link} target="_blank" rel="noreferrer" variant="h1" fontSize="1.5em">
              {entity.title}
            </Link>
          ) : (
            <Typography variant="h1" fontSize="1.5em" color={theme.palette.primary.main}>
              {entity.title}
            </Typography>
          )}
          {entity.description && <Typography variant="body2">{entity.description}</Typography>}
          {fans && (
            <Typography variant="body2" color={theme.palette.secondary.main}>
              {fans}
            </Typography>
          )}
          {isGroup(entity) && (
            <>
              {entity.code && (
                <Typography variant="body2" color={theme.palette.secondary.main}>
                  Code: {entity.code}
                </Typography>
              )}
              {entity.mz_code && (
                <Typography variant="body2" color={theme.palette.secondary.main}>
                  M-Z Code: {entity.mz_code}
                </Typography>
              )}
            </>
          )}
        </CardContent>
      </Card>
      {isLeaderboard && (
        <Box
          sx={{
            position: 'absolute',
            top: 4,
            right: 4
          }}>
          {entity.position <= 3 ? (
            <Box width={leaderboardTop3PositionSize} height={leaderboardTop3PositionSize}>
              <Image src={`/medal_${entity.position}.svg`} layout="fill" alt="Medal corresponding to position" />
            </Box>
          ) : (
            <Box
              width={leaderboardPositionSize}
              height={leaderboardPositionSize}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="50%"
              color={theme.palette.secondary.contrastText}
              bgcolor={theme.palette.secondary.light}>
              {entity.position}
            </Box>
          )}
        </Box>
      )}
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
