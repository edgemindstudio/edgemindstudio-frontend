// components/landing/Workflow.tsx

import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';

const steps = [
  {
    title: '1️⃣ Watch',
    description: 'Start with visual explanations and interactive video lessons.',
  },
  {
    title: '2️⃣ Code',
    description: 'Practice in real Python notebooks and simulated experiments.',
  },
  {
    title: '3️⃣ Apply',
    description: 'Build mini-projects that reflect real-world AI & data challenges.',
  },
  {
    title: '4️⃣ Reflect',
    description: 'Get progress feedback, revisit weak spots, and master topics.',
  },
];

const Workflow = () => {
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
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Your Learning Journey
        </Typography>

        <Grid container spacing={4} mt={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  bgcolor: 'grey.900',
                  height: '100%',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="grey.300">
                    {step.description}
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

export default Workflow;
