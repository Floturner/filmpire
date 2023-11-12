import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL } from '../services/tmdb';

function FeatureMovie({ movie }) {
  if (!movie) return null;

  const backdropImage = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`
    : 'http://via.placeholder.com/1000';

  return (
    <Box
      component={Link}
      to={`/movies/${movie.id}`}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '500px',
        textDecoration: 'none',
        mb: 4,
      }}
    >
      <Grow in>
        <Card
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            borderRadius: 3,
            '&.MuiCard-root': { position: 'relative' },
          }}
        >
          <CardMedia
            image={backdropImage}
            alt={movie.title}
            title={movie.title}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.575)',
              backgroundBlendMode: 'darken',
            }}
          />
          <Box padding={3}>
            <CardContent
              sx={(theme) => ({
                color: '#ffffff',
                width: '50%',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
                '&.MuiCardContent-root': {
                  position: 'relative',
                  backgroundColor: 'transparent',
                },
              })}
            >
              <Typography variant="h5" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body2">{movie.overview}</Typography>
            </CardContent>
          </Box>
        </Card>
      </Grow>
    </Box>
  );
}

export default FeatureMovie;
