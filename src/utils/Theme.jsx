import { useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext();
const COLOR_MODE_KEY = 'color_mode';

function Theme({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    const localTheme = localStorage.getItem(COLOR_MODE_KEY);
    if (localTheme) setMode(localTheme);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: ['Montserrat', 'sans-serif'].join(','),
        },
      }),
    [mode]
  );

  function toggleColorMode() {
    const colorMode = mode === 'light' ? 'dark' : 'light';
    setMode(colorMode);
    localStorage.setItem(COLOR_MODE_KEY, colorMode);
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default Theme;
