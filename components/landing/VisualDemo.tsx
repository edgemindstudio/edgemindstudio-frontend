// components/landing/VisualDemo.tsx

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const VisualDemo = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        bgcolor: 'black',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          🎥 Learn Visually Like 3Blue1Brown
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Our lessons use animations, intuitive visuals, and code simulations to build deep understanding —
          perfect for visual learners.
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 800,
            aspectRatio: '16/9',
            mx: 'auto',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 4,
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/aircAruvnKk"
            title="Visual AI Explanation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 0,
            }}
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};

export default VisualDemo;
