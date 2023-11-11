import { Box, CircularProgress } from '@mui/material';

function CircularLoading() {
  return (
    <Box display="flex" justifyContent="center" mb={4}>
      <CircularProgress />
    </Box>
  );
}

export default CircularLoading;
