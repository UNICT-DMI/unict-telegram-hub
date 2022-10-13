import { Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Channel } from '../../pages/api/channels';
import styles from './Card.module.css';

function GenericCard(props: Props) {
  const { entity } = props;

  return (
    <Card className={styles.card}>
        <CardMedia component='img' height='200px' src={entity.pictureURL} />
        <CardContent>
          <Link href={entity.link} target='_blank' rel='noopener' variant='h5' underline='hover'>
            {entity.title}
          </Link>
          {entity.description ? (
            <Typography variant='body2' color='text.secondary'>
              {entity.description}
            </Typography>
          ) : undefined}
        </CardContent>
    </Card>
  );
}

export default GenericCard;

interface Props {
  entity: Channel;
}
