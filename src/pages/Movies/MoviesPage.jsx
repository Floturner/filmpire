import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CircularLoading,
  EmptyOrError,
  FeatureMovie,
  MovieList,
  Pagination,
} from '../../components';
import { useGetMoviesQuery } from '../../services';

function MoviesPage() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryId, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const {
    data: movies,
    isFetching,
    error,
  } = useGetMoviesQuery({
    genreIdOrCategoryId,
    page,
    searchQuery,
  });

  function paginate(value) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPage(value);
  }

  return (
    <>
      {isFetching && <CircularLoading />}
      {error ? (
        <EmptyOrError>
          Something went wrong. Please try again later.
        </EmptyOrError>
      ) : (
        <div>
          {movies?.results.length ? (
            <>
              <FeatureMovie movie={movies.results[0]} />
              <MovieList movies={movies.results} excludeFirst />
              <Pagination
                currentPage={page}
                totalPages={movies.total_pages}
                setPage={(value) => paginate(value)}
              />
            </>
          ) : (
            !isFetching && (
              <EmptyOrError>
                {searchQuery ? (
                  <>
                    No movies found that match that name.
                    <br />
                    Please search for something else.
                  </>
                ) : (
                  <>No movies found.</>
                )}
              </EmptyOrError>
            )
          )}
        </div>
      )}
    </>
  );
}

export default MoviesPage;
