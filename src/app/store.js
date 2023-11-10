import { configureStore } from '@reduxjs/toolkit';
import { authReducer, genreOrCategoryReducer } from '../features';
import { tmdbApi } from '../services';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
