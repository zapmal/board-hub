import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';

export default createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    width: 100%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  body {
    font-family: 'Roboto', 'Segoe UI', Helvetica;
    background-color: #ffffff;
    line-height: 1.4;
    color: #2F3342;
  }

  a:link,
  a:visited {
    /* color: #0077cc; */
  }

  a:hover,
  a:focus {
    /* color: #004499; */
  }

  code,
  pre {
    max-width: 100%;
  }
`;