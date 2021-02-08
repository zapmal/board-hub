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
    <Container>
      <Typography variant='h4' align='center' gutterBottom>
        Registrate en <Highlight>Board Hub</Highlight>
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
        Créate una cuenta y empieza a ser <Highlight>productiv@</Highlight>.
      </Typography>
    </Container>
  );
};

export default Signup;