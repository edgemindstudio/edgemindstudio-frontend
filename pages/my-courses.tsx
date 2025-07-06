// pages/my-courses.tsx

import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor_username: string;
  price: string;
  access_type: string;
}

function MyCoursesPageContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axiosInstance.get('/courses/my-courses/');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to load enrolled courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        🎒 My Enrolled Courses
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : courses.length === 0 ? (
        <Typography variant="body1" align="center" mt={4}>
          You haven’t enrolled in any courses yet.
        </Typography>
      ) : (
        <Grid container spacing={4} mt={2}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  bgcolor: 'background.paper',
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Instructor:</strong> {course.instructor_username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Access:</strong> {course.access_type} | <strong>Price:</strong> ${course.price || '0.00'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <Box p={2}>
                  <Link href={`/courses/${course.id}`} passHref>
                    <Button variant="contained" fullWidth>
                      Continue Course
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default function MyCoursesPage() {
  return (
    <ProtectedRoute>
      <MyCoursesPageContent />
    </ProtectedRoute>
  );
}
