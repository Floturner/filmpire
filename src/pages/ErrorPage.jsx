import { CssBaseline } from '@mui/material';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <CssBaseline />
      <h1>Oops</h1>
      <p>
        {isRouteErrorResponse(error)
          ? 'This page does not exists.'
          : 'An unexpected error occured.'}
      </p>
    </div>
  );
}

export default ErrorPage;
