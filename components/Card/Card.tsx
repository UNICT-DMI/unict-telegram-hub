import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { EntityWithPosition } from '../../models/api/Entity';

function GenericCard({ entity }: Props) {
  const cardMaxWidth = 400;
  const cardMaxHeight = 175;

  return (
    <Card
      sx={{
        display: 'flex',
        position: 'relative',
        maxWidth: cardMaxWidth + 'px',
        maxHeight: cardMaxHeight + 'px'
      }}>
      <Box>
        <CardMedia
          component='img'
          src={entity.pictureURL}
          sx={{ maxWidth: cardMaxHeight + 'px' }}
        />
      </Box>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: cardMaxWidth - cardMaxHeight + 'px'
        }}>
        <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <Link href={entity.link} target='_blank' rel='noopener' variant='h5' underline='hover'>
            {entity.title}
          </Link>
        </Box>
        {entity.description ? (
          <Typography variant='body2' color='text.secondary'>
            {entity.description}
          </Typography>
        ) : undefined}
      </CardContent>
      <span style={{ position: 'absolute', top: '0', right: '0' }}>{entity.position}</span>
    </Card>
  );
}

export default GenericCard;

interface Props {
  entity: EntityWithPosition;
}
