import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CircularLoading,
  EmptyOrError,
  MovieList,
  Pagination,
} from '../../components';
import { useGetMoviesQuery } from '../../services';
import { delay } from '../../utils';

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

  async function paginate(value) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    await delay(500);
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
              <MovieList movies={movies.results} />
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
