import { HomeRounded as HomeRoundedIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function EmptyOrError({ showButton = false, height = 300, children }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height={height}
    >
      <Typography align="center" variant="body1" mb={showButton ? 2 : 0}>
        {children}
      </Typography>
      {showButton && (
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<HomeRoundedIcon />}
        >
          Go Home
        </Button>
      )}
    </Box>
  );
}

export default EmptyOrError;
