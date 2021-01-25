import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button,
  Box,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import logo from '../images/logo-alter.png';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#f6914d'
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    fontWeight: 700,
    size: '18px',
    marginLeft: '25px'
  },
}));

const headerRoutes = [
  {
    label: 'Acerca de nosotros',
    href: '/about',
  },
  {
    label: 'Open Source',
    href: '/opensource',
  },
  {
    label: 'Inicio de sesión',
    href: '/signin',
  },
  {
    label: 'Registro',
    href: '/signup',
  },
];

const Nav = () => {
  const { header, toolbar, button } = useStyles();

  return (
    <header>
      <AppBar className={header}>
        <Toolbar className={toolbar}>
          <img src={logo} width='160px' />
          {/* <a><img src={logo} width='160px' /></a> */}
          <Box>
            {headerRoutes.map(({ label, href }) => (
              <Button
                {...{
                  key: label,
                  color: 'inherit',
                  to: href,
                  className: button
                  // component: Link,
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Nav;