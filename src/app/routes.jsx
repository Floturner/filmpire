import { createBrowserRouter } from 'react-router-dom';
import {
  ActorDetailsPage,
  App,
  ErrorPage,
  MovieDetailsPage,
  MoviesPage,
  ProfilePage,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MoviesPage />,
      },
      {
        path: 'movies/:id',
        element: <MovieDetailsPage />,
      },
      {
        path: 'actors/:id',
        element: <ActorDetailsPage />,
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
