import {
  ArrowBackOutlined as ArrowBackOutlinedIcon,
  MovieOutlined as MovieOutlinedIcon,
} from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CircularLoading,
  EmptyOrError,
  MovieList,
  Pagination,
} from '../../components';
import {
  TMDB_IMAGE_BASE_URL,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
} from '../../services';

function ActorDetailsPage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    data: actor,
    isFetching: isActorFetching,
    error: isActorError,
  } = useGetActorQuery(id);
  const {
    data: movies,
    isFetching: isMoviesFetching,
    error: isMoviesError,
  } = useGetMoviesByActorIdQuery({ id, page });
  const moviesWrapperRef = useRef(null);

  function paginate(value) {
    moviesWrapperRef.current?.scrollIntoView({ behavior: 'smooth' });
    setPage(value);
  }

  if (isActorFetching) {
    return <CircularLoading />;
  }

  if (isActorError) {
    return (
      <EmptyOrError showButton>
        Something went wrong. Please try again later.
      </EmptyOrError>
    );
  }

  if (!actor) {
    return (
      <EmptyOrError showButton>
        The actor you are looking for can not be found.
      </EmptyOrError>
    );
  }

  const profileImage = actor.profile_path
    ? `${TMDB_IMAGE_BASE_URL}/w500${actor.profile_path}`
    : 'http://via.placeholder.com/500';

  return (
    <Grid
      container
      spacing={3}
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          flexWrap: 'wrap',
        },
      })}
    >
      {/* Image */}
      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          mb: { xs: 5, lg: 0 },
        }}
      >
        <Box
          component="img"
          src={profileImage}
          sx={(theme) => ({
            borderRadius: '20px',
            boxShadow: `0.5em 1em 1em ${
              theme.palette.mode === 'light' ? 'gray' : '#212121'
            }`,
            width: '80%',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              boxShadow: `0.5em 0.5em 1em ${
                theme.palette.mode === 'light' ? 'gray' : '#212121'
              }`,
            },
            [theme.breakpoints.down('md')]: {
              width: '60%',
              height: '350px',
            },
          })}
        />
      </Grid>
      {/* Details */}
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        xs={12}
        lg={8}
      >
        {actor.name && (
          <Typography sx={{ typography: { xs: 'h4', lg: 'h3' } }} gutterBottom>
            {actor.name}
          </Typography>
        )}

        {actor.birthday && (
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {`Born: ${new Date(actor.birthday).toDateString()}`}
          </Typography>
        )}

        <Typography variant="body1" gutterBottom align="justify" paragraph>
          {actor.biography || 'Sorry, not biography yet...'}
        </Typography>

        <Grid
          item
          container
          sx={{ mt: 1 }}
          justifyContent="space-between"
          spacing={2}
        >
          {actor.imdb_id && (
            <Grid item>
              <Button
                size="small"
                variant="outlined"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/name/${actor.imdb_id}`}
                startIcon={<MovieOutlinedIcon />}
              >
                IMDB
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackOutlinedIcon />}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* Movies */}
      <Grid
        item
        xs={12}
        mt={4}
        ref={moviesWrapperRef}
        sx={{ scrollMargin: '100px' }}
      >
        <Typography
          sx={{ typography: { xs: 'h4', lg: 'h3' }, mb: 4 }}
          gutterBottom
          align="center"
        >
          Movies
        </Typography>
        {isMoviesFetching && <CircularLoading />}
        {isMoviesError ? (
          <EmptyOrError height={100}>
            Something went wrong. Please try again later.
          </EmptyOrError>
        ) : (
          <div>
            {movies?.results.length ? (
              <>
                <MovieList movies={movies.results} count={12} />
                <Pagination
                  currentPage={page}
                  totalPages={movies.total_pages}
                  setPage={(value) => paginate(value)}
                />
              </>
            ) : (
              !isMoviesFetching && (
                <EmptyOrError height={100}>
                  No movies found for this actor.
                </EmptyOrError>
              )
            )}
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default ActorDetailsPage;
