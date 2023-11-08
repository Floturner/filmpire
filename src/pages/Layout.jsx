import { CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';
import useStyles from '../styles';

function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
