import { createBrowserRouter } from 'react-router-dom';
import {
  Actors,
  ErrorPage,
  Layout,
  MovieDetails,
  Movies,
  Profile,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Movies />,
      },
      {
        path: 'movies/:id',
        element: <MovieDetails />,
      },
      {
        path: 'actors/:id',
        element: <Actors />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
