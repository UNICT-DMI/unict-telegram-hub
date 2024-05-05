import { Box } from '@mui/material';
import GenericCard from './card';
import Toolbox from './toolbox';

export default function TelegramDashboard() {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(min(25em, 100%), 1fr))"
      gap={1}>
      <Toolbox />
      {new Array(50).fill(undefined).map((_, i) => (
        <GenericCard
          key={i}
          isLeaderboard={true}
          entity={{
            title: `Title ${i}`,
            description: `Description ${i}`,
            link: 'http://localhost:3000/telegram',
            position: i + 1,
            subscribers: i
          }}
        />
      ))}
    </Box>
  );
}
