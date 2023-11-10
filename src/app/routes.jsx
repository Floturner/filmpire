import { createBrowserRouter } from 'react-router-dom';
import {
  ActorsPage,
  ErrorPage,
  Layout,
  MovieDetailsPage,
  MoviesPage,
  ProfilePage,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        element: <ActorsPage />,
      },
      {
        path: 'profile/:id',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
