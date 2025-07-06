// components/landing/SocialProof.tsx

import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import Image from 'next/image';

const logos = [
  { src: '/logos/openai.svg', alt: 'OpenAI' },
  { src: '/logos/deepmind.svg', alt: 'DeepMind' },
  { src: '/logos/nvidia.svg', alt: 'NVIDIA' },
  { src: '/logos/mit.svg', alt: 'MIT' },
  { src: '/logos/stanford.svg', alt: 'Stanford' },
];

const SocialProof = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        bgcolor: 'grey.950',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Trusted by Learners and Enthusiasts Worldwide
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          {logos.map((logo) => (
            <Grid item key={logo.alt}>
              <Box sx={{ position: 'relative', width: 100, height: 40 }}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 768px) 80px, 100px"
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" color="grey.400" mt={6}>
          Join{' '}
          <Box component="span" fontWeight={700} color="#fff">
            12,000+
          </Box>{' '}
          learners in building the future of AI and data science.
        </Typography>
      </Container>
    </Box>
  );
};

export default SocialProof;
