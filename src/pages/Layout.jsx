import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { TheNav } from '../components';

function Layout() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <TheNav />
      <Box component="main" sx={{ flexGrow: '1', padding: '2em' }}>
        <Box sx={{ height: '70px' }} />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
