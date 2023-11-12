import { Grid } from '@mui/material';
import Movie from './Movie';

function MovieList({ movies, countPerPage = 18, excludeFirst = false }) {
  const startFrom = excludeFirst ? 1 : 0;
  const count = startFrom + countPerPage;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: {
          xs: 'center',
          md: 'flex-start',
        },
        overflow: 'auto',
      }}
    >
      {movies.slice(startFrom, count).map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </Grid>
  );
}

export default MovieList;
