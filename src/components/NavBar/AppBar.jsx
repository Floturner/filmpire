import {
  AccountCircle as AccountCircleIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSelector, setUser } from '../../features';
import {
  REQUEST_TOKEN_KEY,
  SESSION_ID_KEY,
  createSessionId,
  fetchToken,
  getUser,
} from '../../utils';
import Search from '../Search';

export default function AppBar({
  isDarkMode,
  isMobile,
  drawerWidth,
  toggleDrawer,
}) {
  const { isAuthenticated, user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const localToken = localStorage.getItem(REQUEST_TOKEN_KEY);
  const localSessionId = localStorage.getItem(SESSION_ID_KEY);

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(
    () => {
      async function loginUser() {
        if (localToken) {
          let sessionId = localSessionId;
          sessionId ??= await createSessionId();
          const userData = await getUser(sessionId);
          dispatch(setUser(userData));
        }
      }
      loginUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localToken]
  );

  return (
    <MuiAppBar position="fixed">
      <Toolbar
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          ml: drawerWidth,
          [theme.breakpoints.down('sm')]: {
            ml: 0,
            flexWrap: 'wrap',
          },
        })}
      >
        {isMobile && (
          <IconButton
            sx={{ display: { sm: 'none' }, mr: 2, outline: 'none' }}
            size="large"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {!isMobile && <Search />}
        <div>
          {isAuthenticated ? (
            <IconButton
              LinkComponent={Link}
              component={Link}
              color="inherit"
              to={`profile/${user.id}`}
            >
              <Avatar
                alt="Profile"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              />
            </IconButton>
          ) : (
            <Button
              color="inherit"
              endIcon={<AccountCircleIcon />}
              onClick={() => fetchToken()}
            >
              Login
            </Button>
          )}
        </div>
        {isMobile && <Search />}
      </Toolbar>
    </MuiAppBar>
  );
}
