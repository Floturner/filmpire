import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import AppBar from './AppBar';
import SideBar from './SideBar';

const drawerWidth = '240px';

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        drawerWidth={drawerWidth}
        toggleDrawer={(value) => setIsDrawerOpen(value)}
      />
      <SideBar
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        drawerWidth={drawerWidth}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={(value) => setIsDrawerOpen(value)}
      />
    </>
  );
}
