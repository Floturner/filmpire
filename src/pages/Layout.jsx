import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

function Layout() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: {
            xs: '4.5em 1em 2em',
            sm: '2em',
          },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
