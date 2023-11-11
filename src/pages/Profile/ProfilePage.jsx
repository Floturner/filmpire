import { ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CircularLoading,
  EmptyOrError,
  MovieList,
  Pagination,
} from '../../components';
import { authSelector } from '../../features';
import { useGetListQuery } from '../../services';
import { SESSION_ID_KEY } from '../../utils';

export default function ProfilePage() {
  const { user } = useSelector(authSelector);
  const [favoritePage, setFavoritePage] = useState(1);
  const [watchlistPage, setWatchlistPage] = useState(1);
  const {
    data: favoriteMovies,
    isFetching: isFavoriteMoviesFetching,
    error: isFavoriteMoviesError,
    refetch: refechFavorites,
  } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem(SESSION_ID_KEY),
    page: favoritePage,
  });
  const {
    data: watchlistMovies,
    isFetching: isWatchlistMoviesFetching,
    error: isWatchlistMoviesError,
    refetch: refetchWatchlisted,
  } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem(SESSION_ID_KEY),
    page: watchlistPage,
  });

  useEffect(
    () => {
      refechFavorites();
      refetchWatchlisted();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  function paginate(value, scrollToRef, isFav = true) {
    scrollToRef?.current?.scrollIntoView({ behavior: 'smooth' });
    if (isFav) {
      setFavoritePage(value);
    } else {
      setWatchlistPage(value);
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Box>
          <Button
            variant="outlined"
            endIcon={<ExitToAppIcon />}
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <RatedContent
        title="Favorite Movies"
        movies={favoriteMovies}
        isFetching={isFavoriteMoviesFetching}
        error={isFavoriteMoviesError}
        page={favoritePage}
        favorite
        gutterBottom
        paginate={(page, scrollToRef, isFav) =>
          paginate(page, scrollToRef, isFav)
        }
      />
      <RatedContent
        title="Watchlist"
        movies={watchlistMovies}
        isFetching={isWatchlistMoviesFetching}
        error={isWatchlistMoviesError}
        page={watchlistPage}
        paginate={(page, scrollToRef, isFav) =>
          paginate(page, scrollToRef, isFav)
        }
      />
    </>
  );
}

function RatedContent({
  title,
  movies,
  isFetching,
  error,
  page,
  paginate,
  favorite = false,
  gutterBottom = false,
}) {
  const boxRef = useRef(null);

  return (
    <Box ref={boxRef} sx={{ scrollMargin: '100px', mb: gutterBottom ? 6 : 0 }}>
      <Typography typography="h5" mb={3} fontWeight="400" gutterBottom>
        {title}
      </Typography>
      {isFetching && <CircularLoading />}
      {error ? (
        <EmptyOrError>
          Something went wrong. Please try again later.
        </EmptyOrError>
      ) : (
        <div>
          {movies?.results.length ? (
            <>
              <MovieList movies={movies.results} />
              <Pagination
                currentPage={page}
                totalPages={movies.total_pages}
                setPage={(value) => paginate(value, boxRef, favorite)}
              />
            </>
          ) : (
            !isFetching && <EmptyOrError>No movies found.</EmptyOrError>
          )}
        </div>
      )}
    </Box>
  );
}
