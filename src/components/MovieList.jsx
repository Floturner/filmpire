import { Grid } from '@mui/material';
import Movie from './Movie';

function MovieList({ movies }) {
  return (
    <Grid
      container
      spacing="30px"
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
      {movies.results.map((movie, index) => (
        <Movie key={movie.id} movie={movie} index={index} />
      ))}
    </Grid>
  );
}

export default MovieList;
