import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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
    extraColors: {
      lightDark: '#5e5756',
      darkBlue: '#2F3342',
    },
  },
});