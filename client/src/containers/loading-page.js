import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import { SpinnerPage } from '../components/spinner';

export const LoadingPage = () => (
  <>
    <Jumbotron fluid>
      <h1 className="invisible">Loading...</h1>
    </Jumbotron>
    <SpinnerPage />
  </>
);