import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { EmptyOrError, Layout } from '../../components';

function ErrorPage() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);

  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height={300}
      >
        <Typography align="center" variant="h2" fontWeight="400" mb={2}>
          Oops!
        </Typography>
        <Typography align="center" variant="body1" mb={isRouteError ? 2 : 0}>
          {isRouteError
            ? 'The page your are looking for does not exist.'
            : 'An unexpected error has  occured.'}
        </Typography>
        {isRouteError && (
          <Button
            component={Link}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
        )}
      </Box>
      <EmptyOrError />
    </Layout>
  );
}

export default ErrorPage;
