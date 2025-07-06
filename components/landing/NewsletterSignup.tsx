// components/landing/NewsletterSignup.tsx

import React from 'react';
import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material';

export default function NewsletterSignup() {
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
      <Container maxWidth="sm">
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          📬 Stay in the Loop
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Subscribe to our newsletter for new course drops, AI tools, and data science tips — delivered monthly.
        </Typography>
        <Stack
          component="form"
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          maxWidth="sm"
          mx="auto"
        >
          <TextField
            type="email"
            label="Enter your email"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              bgcolor: '#fff',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Subscribe
          </Button>
        </Stack>
        <Typography variant="caption" color="grey.400" display="block" mt={2}>
          No spam. Unsubscribe anytime.
        </Typography>
      </Container>
    </Box>
  );
}
