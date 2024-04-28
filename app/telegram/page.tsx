import { Box } from '@mui/material';

export default function TelegramDashboard() {
  return (
    <>
      {new Array(17).fill(undefined).map((_, i) => (
        <Box
          key={i}
          bgcolor={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}
          height={100}
        />
      ))}
    </>
  );
}
