// components/Footer.tsx

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 3,
        borderTop: 1,
        borderColor: 'grey.800',
        textAlign: 'center',
        bgcolor: 'background.default',
        color: 'text.secondary',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} EdgeMind Studio. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
