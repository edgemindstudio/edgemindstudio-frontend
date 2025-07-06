// components/landing/Topics.tsx

import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const topics = [
  {
    title: '📊 Data Science',
    description: 'Work with real datasets, uncover insights, and create predictive models.',
  },
  {
    title: '🧠 AI & Deep Learning',
    description: 'Understand how neural networks work from scratch with visual demos.',
  },
  {
    title: '📐 Statistics & Probability',
    description: 'Learn the math behind modern AI systems and statistical inference.',
  },
];

const Topics = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'grey.900',
        color: '#fff',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          What You'll Learn
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {topics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: 'grey.800',
                  height: '100%',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {topic.title}
                  </Typography>
                  <Typography variant="body2" color="grey.300">
                    {topic.description}
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

export default Topics;
