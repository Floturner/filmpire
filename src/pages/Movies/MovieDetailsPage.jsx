import {
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  ArrowBackOutlined as ArrowBackOutlinedIcon,
  FavoriteBorderOutlined as FavoriteBorderOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
  LanguageOutlined as LanguageOutlinedIcon,
  MovieOutlined as MovieOutlinedIcon,
  PlaylistAddOutlined as PlaylistAddOutlinedIcon,
  PlaylistRemoveOutlined as PlaylistRemoveOutlinedIcon,
  TheatersOutlined as TheatersOutlinedIcon,
} from '@mui/icons-material';
import { Box, Button, Grid, Modal, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import genreIcons from '../../assets/genres';
import { CircularLoading, EmptyOrError, MovieList } from '../../components';
import { selectGenreOrCategory } from '../../features';
import {
  TMDB_IMAGE_BASE_URL,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services';
import { convertNumberToTime } from '../../utils';

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const {
    data: movie,
    isFetching: isMovieFetching,
    error: isMovieError,
  } = useGetMovieQuery(id);
  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: isRecommendationsError,
  } = useGetRecommendationsQuery({
    movieId: id,
    list: 'recommendations',
  });

  const isMovieFavorited = false;
  const isMovieWatchListed = true;

  function addToFavorites() {}

  function addToWatchList() {}

  if (isMovieFetching) {
    return <CircularLoading />;
  }

  if (isMovieError) {
    return (
      <EmptyOrError showButton>
        Something went wrong. Please try again later.
      </EmptyOrError>
    );
  }

  if (!movie) {
    return (
      <EmptyOrError showButton>
        The movie you are looking for can not be found.
      </EmptyOrError>
    );
  }

  const posterImage = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/${movie.poster_path}`
    : 'http://via.placeholder.com/500';
  const numberFormat = new Intl.NumberFormat('en-US');
  const voteAverage = Math.round(((movie.vote_average ?? 0) / 2) * 10) / 10;
  const voteCount = numberFormat.format(movie.vote_count ?? 0);
  const runtime = convertNumberToTime(movie.runtime ?? 0);
  const spokenLanguages = movie.spoken_languages ?? [];
  const cast = movie.credits?.cast ?? [];
  const videos = movie.videos?.results ?? [];

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
          src={posterImage}
          sx={(theme) => ({
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em gray',
            width: '80%',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              boxShadow: '0.5em 0.5em 1em gray',
            },
            [theme.breakpoints.down('md')]: {
              width: '60%',
              height: '350px',
            },
          })}
        />
      </Grid>
      {/* Details */}
      <Grid item container direction="column" xs={12} lg={8}>
        {movie.title && movie.release_date && (
          <Typography
            sx={{ typography: { xs: 'h4', lg: 'h3' } }}
            align="center"
            gutterBottom
          >
            {`${movie.title} (${movie.release_date.split('-')[0]})`}
          </Typography>
        )}

        {movie.tagline && (
          <Typography
            variant="h5"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            {movie.tagline}
          </Typography>
        )}

        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box display="flex" align="center">
            <Typography variant="subtitle1" gutterBottom mr={1}>
              {numberFormat.format(voteAverage)}
            </Typography>
            <Rating readOnly value={voteAverage} precision={0.1} />
            <Typography variant="subtitle1" gutterBottom ml={1}>
              {`(${voteCount} votes)`}
            </Typography>
          </Box>
        </Grid>

        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box display="flex" align="center">
            <AccessTimeOutlinedIcon
              fontSize="0"
              sx={{ mt: '6px', mr: '4px' }}
            />
            <Typography variant="subtitle1" gutterBottom>
              {runtime}
            </Typography>
            {spokenLanguages.length && (
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ '&::before': { content: '"/"', mx: 1 } }}
              >
                {spokenLanguages
                  .map((lang) => lang.english_name)
                  .sort()
                  .join(' - ')}
              </Typography>
            )}
          </Box>
        </Grid>

        {movie.genres?.length && (
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              mt: '4px',
            }}
            gap={1}
          >
            {movie.genres.map((genre) => (
              <Button
                key={genre.id}
                color="inherit"
                component={Link}
                to="/"
                startIcon={
                  <Box
                    component="img"
                    src={genreIcons[genre.name.toLowerCase()]}
                    sx={(theme) => ({
                      filter:
                        theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
                    })}
                    height={18}
                  />
                }
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                {genre.name}
              </Button>
            ))}
          </Grid>
        )}

        {movie.overview && (
          <Box>
            <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" align="justify" paragraph>
              {movie.overview}
            </Typography>
          </Box>
        )}

        {cast.length && (
          <>
            <Typography variant="h5" sx={{ mt: 1, mb: 2 }} gutterBottom>
              Top Cast
            </Typography>
            <Grid item container spacing={2}>
              {cast
                .filter((character) => !!character.profile_path)
                .slice(0, 6)
                .map((character) => (
                  <Grid
                    key={character.id}
                    item
                    xs={4}
                    md={2}
                    component={Link}
                    to={`/actors/${character.id}`}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Box
                      component="img"
                      src={`${TMDB_IMAGE_BASE_URL}/${character.profile_path}`}
                      alt={character.name}
                      sx={{
                        width: '100%',
                        height: '8em',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                    <Typography color="text.primary">
                      {character.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {character.character.split('/')[0].trim()}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          </>
        )}

        <Grid
          item
          container
          sx={{ mt: 1 }}
          justifyContent="space-between"
          spacing={2}
        >
          {movie.homepage && (
            <Grid item>
              <Button
                size="small"
                variant="outlined"
                target="_blank"
                rel="noopener noreferrer"
                href={movie.homepage}
                startIcon={<LanguageOutlinedIcon />}
              >
                Website
              </Button>
            </Grid>
          )}
          {movie.imdb_id && (
            <Grid item>
              <Button
                size="small"
                variant="outlined"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
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
              startIcon={<TheatersOutlinedIcon />}
              onClick={() =>
                videos.length > 0 ? setIsTrailerModalOpen(true) : undefined
              }
            >
              Trailer
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="outlined"
              startIcon={
                isMovieFavorited ? (
                  <FavoriteBorderOutlinedIcon />
                ) : (
                  <FavoriteOutlinedIcon />
                )
              }
              onClick={() => addToFavorites()}
            >
              {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="outlined"
              startIcon={
                isMovieWatchListed ? (
                  <PlaylistRemoveOutlinedIcon />
                ) : (
                  <PlaylistAddOutlinedIcon />
                )
              }
              onClick={() => addToWatchList()}
            >
              Watchlist
            </Button>
          </Grid>
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
      {/* Recommendations */}
      <Grid item xs={12} mt={5}>
        <Typography
          sx={{ typography: { xs: 'h4', lg: 'h3' }, mb: 4 }}
          gutterBottom
          align="center"
        >
          You might also like
        </Typography>
        {isRecommendationsFetching ? (
          <CircularLoading />
        ) : (
          <div>
            {isRecommendationsError ? (
              <EmptyOrError height={100}>
                Something went wrong. Please try again later.
              </EmptyOrError>
            ) : (
              <div>
                {recommendations?.results.length ? (
                  <MovieList movies={recommendations.results} count={12} />
                ) : (
                  <EmptyOrError height={100}>
                    No recommendations found for this movie.
                  </EmptyOrError>
                )}
              </div>
            )}
          </div>
        )}
      </Grid>
      {/* Trailer Modal */}
      {videos.length && (
        <Modal
          aria-label="Trailer"
          open={isTrailerModalOpen}
          closeAfterTransition
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClose={() => setIsTrailerModalOpen(false)}
        >
          <Box
            component="iframe"
            sx={{
              border: 0,
              width: {
                xs: '92%',
                sm: '85%',
                md: '80%',
                lg: '60%',
              },
              height: {
                xs: '30%',
                sm: '40%',
                md: '40%',
                lg: '70%',
              },
            }}
            title="Trailer"
            src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1&mute=1`}
          />
        </Modal>
      )}
    </Grid>
  );
}

export default MovieDetailsPage;
