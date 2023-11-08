import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import TheAppBar from './TheAppBar';
import TheSideBar from './TheSideBar';

function TheNav() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <TheAppBar
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        openMobileDrawer={() => setIsMobileDrawerOpen(true)}
      />
      <TheSideBar
        isDarkMode={isDarkMode}
        isMobile={isMobile}
        isMobileDrawerOpen={isMobileDrawerOpen}
        closeMobileDrawer={() => setIsMobileDrawerOpen(false)}
      />
    </>
  );
}

export default TheNav;
