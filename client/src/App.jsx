import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import GlobalStyle from './components/GlobalStyle';
import Pages from './pages';

import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Pages />
    </ThemeProvider>
  );
};

export default App;
