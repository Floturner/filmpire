import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MovieList } from '../../components';
import { useGetMoviesQuery } from '../../services';

function MoviesPage() {
  const [page] = useState(1);
  const { genreIdOrCategoryId, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching, error } = useGetMoviesQuery({
    genreIdOrCategoryId,
    page,
    searchQuery,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" marginTop="20px">
        <Typography variant="h4">
          No movies found that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h4">An error has occured.</Typography>;
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
}

export default MoviesPage;
