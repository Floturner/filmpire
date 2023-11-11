import { Grid } from '@mui/material';
import Movie from './Movie';

function MovieList({ movies, count }) {
  return (
    <Grid
      container
      spacing="30px"
      width="100%"
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
      {movies.slice(0, count).map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </Grid>
  );
}

export default MovieList;
