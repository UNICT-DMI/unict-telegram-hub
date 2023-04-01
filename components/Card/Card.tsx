import Image from 'next/image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import styled from '@mui/material/styles/styled';
import Typography from '@mui/material/Typography';
import useIsMobile from '../../hooks/useIsMobile';
import { Channel, Entity, EntityWithPosition, Group } from '../../models/api/Entity';

function isChannel(entity: Entity): entity is Channel {
  return (entity as Channel).subscribers != undefined;
}

function isGroup(entity: Entity): entity is Group {
  return (entity as Group).members != undefined;
}

function getFans(entity: Entity): string {
  if (isChannel(entity) && entity.subscribers >= 0) {
    return `Subscribers: ${entity.subscribers}`;
  }
  if (isGroup(entity) && entity.members >= 0) {
    return `Members: ${entity.members}`;
  }

  return '';
}

function GenericCard({ isLeaderboard, entity }: Props) {
  const isMobile = useIsMobile();

  const cardWidth = `${isMobile ? 350 : 450}px`;
  const pictureSideSize = `${isMobile ? 100 : 150}px`;
  const medalWidth = `${isMobile ? 25 : 40}px`;
  const medalHeight = `${isMobile ? 35 : 50}px`;
  const circleSize = `${isMobile ? 25 : 30}px`;

  const StyledCircle = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: circleSize,
    height: circleSize,
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '50%'
  }));

  const fans: string = getFans(entity);

  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: cardWidth,
        padding: '8px 12px',
        borderRadius: '16px',
        overflow: 'unset'
      }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex'
        }}>
        <CardMedia
          component="img"
          src={entity.pictureURL ? entity.pictureURL : '/telegram.svg'}
          sx={{ width: pictureSideSize, alignSelf: 'center' }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '8px'
          }}>
          <Link href={entity.link} target="_blank" rel="noopener" variant="h5" underline="hover">
            {entity.title}
          </Link>
          {entity.description ? (
            <Typography variant="body2" color="text.primary">
              {entity.description}
            </Typography>
          ) : undefined}
          {fans ? (
            <Typography variant="body2" color="text.secondary">
              {fans}
            </Typography>
          ) : undefined}
          {isGroup(entity) ? (
            <>
              {entity.code ? (
                <Typography variant="body2" color="text.secondary">
                  Code: {entity.code}
                </Typography>
              ) : undefined}
              {entity.mz_code ? (
                <Typography variant="body2" color="text.secondary">
                  M-Z Code: {entity.mz_code}
                </Typography>
              ) : undefined}
            </>
          ) : undefined}
        </CardContent>
      </Box>
      {isLeaderboard ? (
        <Box
          sx={{
            position: 'absolute',
            top: '-10px',
            right: '-10px'
          }}>
          {entity.position <= 3 ? (
            <Box sx={{ width: medalWidth, height: medalHeight }}>
              <Image
                src={`/medal_${entity.position}.svg`}
                layout="fill"
                alt="Medal corresponding to position"
              />
            </Box>
          ) : (
            <StyledCircle>{entity.position}</StyledCircle>
          )}
        </Box>
      ) : undefined}
    </Card>
  );
}

export default GenericCard;

interface Props {
  isLeaderboard: boolean;
  entity: EntityWithPosition;
}
