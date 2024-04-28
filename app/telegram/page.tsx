import { Box } from '@mui/material';
import Toolbox from './toolbox';

export default function TelegramDashboard() {
  return (
    <>
      <Toolbox />
      {new Array(50).fill(undefined).map((_, i) => (
        <Box
          key={i}
          bgcolor={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}
          height={100}
        />
      ))}
    </>
  );
}
