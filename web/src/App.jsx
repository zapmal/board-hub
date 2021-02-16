import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { QueryClientProvider, QueryClient } from 'react-query';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

import { theme } from './theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Pages />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
