// components/landing/CTA.tsx

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

const CTA = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(90deg, #7C3AED 0%, #4F46E5 100%)',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Ready to begin your AI journey?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Join EdgeMind Studio and start learning with visuals that bring clarity to complex concepts.
        </Typography>
        <Link href="/register" passHref>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              backgroundColor: '#fff',
              color: '#7C3AED',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: '9999px',
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            🎓 Join Now
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default CTA;
