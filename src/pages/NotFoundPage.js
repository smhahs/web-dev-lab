import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h1" color="secondary">404</Typography>
      <Typography variant="h5" gutterBottom>Page Not Found</Typography>
      <Typography variant="body1" paragraph>
        The tea you are looking for has been spilled.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;