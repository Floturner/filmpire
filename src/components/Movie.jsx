import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  Rating,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL } from '../services';

function Movie({ movie, index }) {
  const posterImage = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/w500/${movie.poster_path}`
    : 'http://via.placeholder.com/350';

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={movie.id} timeout={(index + 1) * 250}>
        <Card variant="outlined" sx={{ borderRadius: '8px' }}>
          <CardActionArea
            LinkComponent={Link}
            to={`movies/${movie.id}`}
            sx={{
              '&:hover .MuiCardMedia-root': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            <CardMedia
              component="img"
              src={posterImage}
              alt={movie.title}
              height="350"
            />
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {movie.title}
              </Typography>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </Grid>
  );
}

export default Movie;
