import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '../components/Layout';

import ROUTES, { RenderRoutes } from './routes';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <RenderRoutes routes={ROUTES}/>
      </Layout>
    </Router>
  );
};

export default Pages;