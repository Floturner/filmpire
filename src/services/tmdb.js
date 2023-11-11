import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_KEY;
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: TMDB_API_BASE_URL }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${TMDB_API_KEY}`,
    }),

    // Get Movies by [type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryId, page, searchQuery }) => {
        // Search Movies
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${TMDB_API_KEY}`;
        }

        // Get Movies By Category
        if (typeof genreIdOrCategoryId === 'string') {
          return `/movie/${genreIdOrCategoryId}?page=${page}&api_key=${TMDB_API_KEY}`;
        }

        // Get Movies By Genre
        if (typeof genreIdOrCategoryId === 'number') {
          return `/discover/movie?with_genres=${genreIdOrCategoryId}&page=${page}&api_key=${TMDB_API_KEY}`;
        }

        // Get Popular Movies
        return `/movie/popular?page=${page}&api_key=${TMDB_API_KEY}`;
      },
    }),

    // Get Movie by ID
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${TMDB_API_KEY}`,
    }),

    // Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?session_id=${sessionId}&page=${page}&api_key=${TMDB_API_KEY}`,
    }),

    // Get Movie Recommendations
    getRecommendations: builder.query({
      query: ({ movieId, list }) =>
        `/movie/${movieId}/${list}?api_key=${TMDB_API_KEY}`,
    }),

    // Get Actor by ID
    getActor: builder.query({
      query: (id) => `/person/${id}?api_key=${TMDB_API_KEY}`,
    }),

    // Get Movies by Actor ID
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${TMDB_API_KEY}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
