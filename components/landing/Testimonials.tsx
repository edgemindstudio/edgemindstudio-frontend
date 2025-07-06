// components/landing/Testimonials.tsx

import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const testimonials = [
  {
    quote: '“I finally understand statistics and machine learning. The visuals make it click like never before!”',
    name: 'Samuel O., Graduate Student',
  },
  {
    quote: '“Better than most university lectures. I wish I had this while studying for my comps.”',
    name: 'Jessica M., PhD Candidate',
  },
  {
    quote: '“EdgeMind Studio helped me transition into data science from a business background. Highly recommended.”',
    name: 'Ali R., Data Analyst',
  },
];

const Testimonials = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        bgcolor: '#0f0f0f',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" fontWeight={700} align="center" gutterBottom>
          What Our Learners Say
        </Typography>
        <Typography variant="body1" color="grey.300" align="center" mb={6}>
          Students around the world are transforming their careers with EdgeMind Studio.
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: 'grey.900',
                  color: '#fff',
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                elevation={3}
              >
                <CardContent>
                  <Typography variant="body2" fontStyle="italic">
                    {testimonial.quote}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={600} mt={2}>
                    {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
