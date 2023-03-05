import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppHeader } from './components/AppHeader';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';
import { RestoreUserWrapper } from './components/RestoreUserWrapper';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import './theme';
import { muiTheme } from './theme/muiTheme';

export const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <AppHeader />
          <RestoreUserWrapper>
            <Suspense fallback={<AppLoadingSpinner />}>
              <RootRouter />
            </Suspense>
          </RestoreUserWrapper>
          {/* App Footer. */}
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
