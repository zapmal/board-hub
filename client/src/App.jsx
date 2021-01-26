import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import GlobalStyle from './components/GlobalStyle';
import Nav from './components/Nav';
import theme from './theme';

// #f6914d
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
