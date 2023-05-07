import Box from '@mui/material/Box';

const shutEyesEmoji = <Box style={{ fontSize: '75px' }}>😵</Box>;

const Offline = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <h1>Looks like you are offline </h1>
      {shutEyesEmoji}
    </Box>
  );
};

export default Offline;
