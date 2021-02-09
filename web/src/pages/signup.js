import React from 'react';
import styled from 'styled-components/macro';
import { 
  Typography, 
  Paper,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';

import Highlight from '../components/Highlight';

import graduated from '../assets/svgs/graduated.svg';
import team from '../assets/svgs/team.svg';

const Background = styled.div`
  background-image: url(${graduated}), url(${team});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 360px;
  background-position: left center, right center;

  position: absolute;
  width: 100%;
  left: 2px;
  height: 90%;
  z-index: -1;
`;

const Container = styled.div`
  padding: 25px;
  margin: 0 auto;
  max-width: 700px;
  text-align: center;

  button {
    margin-top: 20px;
    padding: 10px 20px;
  }

  h6 {
    margin: 20px 0 10px 0;
  }
`;

const Signup = () => {
  return (
    <>
      <Background />
      <Container>
        <Typography variant='h4' align='center' gutterBottom>
          Registrate y empieza a usar <Highlight>Board Hub</Highlight>
        </Typography>
        <Paper elevation={4} style={{ padding: '30px 20px' }}>
          <Grid container alignItems='flex-start' spacing={4}>
            <Grid item xs={6}>
              <TextField 
                fullWidth
                variant='outlined'
                type='email'
                label='Email'
                color='secondary'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth
                variant='outlined'
                type='text'
                label='Nombre de usuario'
                color='secondary'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth
                variant='outlined'
                type='password'
                label='Contraseña'
                color='secondary'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth
                variant='outlined'
                type='email'
                label='Confirmación de contraseña'
                color='secondary'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                variant='outlined'
                type='text'
                label='Nombre Completo'
                color='secondary'
              />
            </Grid>
          </Grid>

          <Button variant='contained' color='secondary'>Guardar</Button>
        </Paper>

        <Typography variant='h6' align='center'>
          Empieza a manejar todo de una <Highlight>mejor forma</Highlight>.
        </Typography>
      </Container>
    </>
  );
};

export default Signup;