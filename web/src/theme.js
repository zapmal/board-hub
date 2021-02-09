import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      light: '#8f81d9',
      main: '#7362d0',
      dark: '#504491',
    },
    extraColors: {
      lightDark: '#5e5756',
      darkBlue: '#2F3342',
    },
  },
});

export default theme;