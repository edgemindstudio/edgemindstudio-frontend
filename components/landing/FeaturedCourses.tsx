// components/landing/FeaturedCourses.tsx

import React from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, Container } from '@mui/material';
import Link from 'next/link';

const FeaturedCourses = () => {
  const featured = [
    {
      title: 'Foundations of Data Science',
      desc: 'Learn data wrangling, statistics, and prediction models hands-on.',
      link: '/courses',
    },
    {
      title: 'Mathematics for AI',
      desc: 'Visualize and deeply understand the math that powers AI.',
      link: '/courses',
    },
    {
      title: 'Generative AI with Python',
      desc: 'Build models like GPT, GANs, and VAEs using PyTorch or TensorFlow.',
      link: '/courses',
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" fontWeight={700} gutterBottom>
          📚 Featured Courses
        </Typography>
        <Grid container spacing={4} mt={4}>
          {featured.map((course, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  borderColor: 'grey.800',
                  '&:hover': { borderColor: 'primary.main', boxShadow: 3 },
                  transition: '0.3s',
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.desc}
                  </Typography>
                  <Link href={course.link} passHref>
                    <Button variant="contained" color="primary" size="small">
                      Explore
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedCourses;
