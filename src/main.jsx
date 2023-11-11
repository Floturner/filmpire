import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import { CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router, store } from './app';
import './index.css';
import { Theme } from './utils';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Theme>
      <CssBaseline />
      <RouterProvider router={router} />
    </Theme>
  </Provider>
);
