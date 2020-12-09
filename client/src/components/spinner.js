import React from 'react';
import { Spinner } from 'react-bootstrap';

export const SpinnerPage = () => (
  <div className="spinner__wrapper">
    <Spinner animation="border" role="status" variant="primary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);