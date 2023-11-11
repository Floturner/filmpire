import { Box, Toolbar } from '@mui/material';
import NavBar from '../NavBar/NavBar';

function Layout({ children }) {
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
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
