import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { authSelector } from '../../features';

function ProfilePage() {
  // const { user } = useSelector(authSelector);

  const favoriteMovies = [];

  function logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ExitToAppIcon />}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Box>

      {!favoriteMovies.length ? (
        <Typography variant="body1">
          Add favorites movies or watchlist some movies to see them here.
        </Typography>
      ) : (
        <Box>Favorites Movies</Box>
      )}
    </Box>
  );
}

export default ProfilePage;
