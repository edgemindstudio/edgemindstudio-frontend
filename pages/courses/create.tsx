// pages/courses/create.tsx

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CourseForm from '@/components/courses/CourseForm';

const CreateCoursePage = () => {
  return (
    <ProtectedRoute adminOnly>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={700}>
            📚 Create a New Course
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fill in the details below to add a new course to EdgeMind Studio.
          </Typography>
        </Box>
        <CourseForm />
      </Container>
    </ProtectedRoute>
  );
};

export default CreateCoursePage;
