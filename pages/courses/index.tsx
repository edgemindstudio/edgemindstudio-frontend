// pages/courses/index.tsx

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Link from 'next/link';
import Head from 'next/head';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../hooks/useAuth';
import { isAdmin, isStaff } from '../../utils/roleUtils';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor_username: string;
  price: string;
  access_type: string;
}

interface PaginatedResponse {
  results: Course[];
  next: string | null;
  previous: string | null;
}

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [accessFilter, setAccessFilter] = useState<string>('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchCourses = async (url = '/courses/') => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchQuery) params.search = searchQuery;
      if (accessFilter !== 'all') params.access_type = accessFilter;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;

      const res = await axiosInstance.get<PaginatedResponse>(url, { params });
      setCourses((prev) => (url === '/courses/' ? res.data.results : [...prev, ...res.data.results]));
      setNextPage(res.data.next);
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCourses();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await axiosInstance.delete(`/courses/${id}/`);
      setSnackbar({ open: true, message: 'Course deleted successfully.', severity: 'success' });
      fetchCourses();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to delete course.', severity: 'error' });
    }
  };

  return (
    <>
      <Head>
        <title>All Courses | EdgeMind Studio</title>
        <meta name="description" content="Browse our curated AI, Data Science, and Statistics courses. Learn from the best instructors and track your progress seamlessly." />
        <link rel="canonical" href="https://yourdomain.com/courses" />
      </Head>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
          📚 All Courses
        </Typography>

        <Box component="form" onSubmit={handleSearch} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Access Type</InputLabel>
              <Select
                value={accessFilter}
                label="Access Type"
                onChange={(e) => setAccessFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              fullWidth
            />
            <TextField
              label="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Apply Filters
            </Button>
          </Stack>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : courses.length === 0 ? (
          <Typography variant="body1" align="center">
            No courses found.
          </Typography>
        ) : (
          <>
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
                      <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
                        <strong>Instructor:</strong> {course.instructor_username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Access:</strong> {course.access_type} | <strong>Price:</strong> ${course.price || '0.00'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {course.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2 }}>
                      <Stack spacing={1}>
                        <Link href={`/courses/${course.id}`} passHref>
                          <Button variant="contained" fullWidth>
                            View Course
                          </Button>
                        </Link>
                        {(isAdmin(user?.role) || isStaff(user?.role)) && (
                          <>
                            <Link href={`/courses/${course.id}/edit`} passHref>
                              <Button variant="outlined" color="primary" fullWidth>
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleDelete(course.id)}
                              fullWidth
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {nextPage && (
              <Box textAlign="center" mt={4}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    const relativeUrl = new URL(nextPage).pathname + new URL(nextPage).search;
                    fetchCourses(relativeUrl);
                  }}
                >
                  Load More
                </Button>
              </Box>
            )}
          </>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity as 'success' | 'error'}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
