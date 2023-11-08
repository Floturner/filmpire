import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from '@mui/icons-material';
import { AppBar, Avatar, Button, IconButton, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

function TheAppBar({ isDarkMode, isMobile, openMobileDrawer }) {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isAuthenticated = true;

  function toggleDarkMode() {}

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: 'flex',
          height: '80px',
          justifyContent: 'space-between',
          ml: { xs: 0, md: '240px' },
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        {isMobile && (
          <IconButton
            sx={{
              display: { sm: 'none' },
              mr: 2,
              outline: 'none',
            }}
            color="inherit"
            edge="start"
            onClick={openMobileDrawer}
          >
            <Menu />
          </IconButton>
        )}
        <IconButton
          color="inherit"
          sx={{ ml: 1 }}
          onClick={() => toggleDarkMode()}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && 'Search ...'}
        <div>
          {!isAuthenticated ? (
            <Button color="inherit" style={{ marginRight: '8px' }}>
              Login
              <AccountCircle />
            </Button>
          ) : (
            <Button
              component={Link}
              color="inherit"
              to="profile/123"
              sx={{
                '&:hover': {
                  color: 'white',
                  textDecoration: 'none',
                },
              }}
            >
              {!isMobile && (
                <span style={{ marginRight: '8px' }}>My Movies</span>
              )}
              <Avatar
                style={{ width: '30px', height: '30px' }}
                alt="Profile"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              />
            </Button>
          )}
        </div>
        {isMobile && 'Search ...'}
      </Toolbar>
    </AppBar>
  );
}

export default TheAppBar;
