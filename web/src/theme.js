import { createMuiTheme } from '@material-ui/core';

const extraColors = {
  lightDark: '#5e5756',
  darkBlue: '#2F3342',
};

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      light: '#8f81d9',
      main: '#7362d0',
      dark: '#504491',
    },
    extraColors: extraColors,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#b2b2b2',
    },
    secondary: {
      light: '#5b5959',
      main: '#333030',
      dark: '#232121',
    },
    extraColors: extraColors,
  },
});