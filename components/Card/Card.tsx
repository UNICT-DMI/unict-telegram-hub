import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import useIsMobile from '../../hooks/useIsMobile';
import { EntityWithPosition } from '../../models/api/Entity';

function GenericCard({ entity }: Props) {
  const isMobile = useIsMobile();

  const cardWidth = isMobile ? 350 : 450;
  const pictureSideSize = isMobile ? 100 : 150;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: cardWidth + 'px',
        padding: '8px 12px'
      }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex'
        }}>
        <CardMedia
          component='img'
          src={entity.pictureURL}
          sx={{ width: pictureSideSize + 'px', alignSelf: 'center' }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '8px'
          }}>
          <Link href={entity.link} target='_blank' rel='noopener' variant='h5' underline='hover'>
            {entity.title}
          </Link>
          {entity.description ? (
            <Typography variant='body2' color='text.primary'>
              {entity.description}
            </Typography>
          ) : undefined}
          {entity.subscribers ? (
            <Typography variant='body2' color='text.secondary'>
              Subscribers: {entity.subscribers}
            </Typography>
          ) : undefined}
        </CardContent>
        <span style={{ position: 'absolute', top: '0', right: '0' }}>{entity.position}</span>
      </Box>
    </Card>
  );
}

export default GenericCard;

interface Props {
  entity: EntityWithPosition;
}
