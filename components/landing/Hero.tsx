// components/landing/Hero.tsx

import React from 'react';
import { Box, Grid, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 6 }, bgcolor: 'background.default' }}>
      <Grid container spacing={4} alignItems="center" justifyContent="space-between">
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Visual learning without limits
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            EdgeMind Studio empowers you to master AI, data science, and statistics through visual-first education,
            interactive coding projects, and intuitive explanations — no memorization required.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
            <Link href="/register" passHref>
              <Button variant="contained" color="primary" size="large">
                Join For Free
              </Button>
            </Link>
            <Link href="/courses" passHref>
              <Button variant="outlined" color="primary" size="large">
                Explore Courses
              </Button>
            </Link>
          </Stack>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 300, md: 400 },
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <Image
              src="/images/hero-person.png"
              alt="EdgeMind Hero Visual"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
