// components/courses/CourseForm.tsx

import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import axiosInstance from '@/utils/axiosInstance';
import { useRouter } from 'next/router';

interface CourseFormProps {
  initialData?: {
    title: string;
    description: string;
    price: string;
    access_type: 'free' | 'premium';
  };
  isEditMode?: boolean;
  courseId?: number;
}

const CourseForm = ({ initialData, isEditMode = false, courseId }: CourseFormProps) => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    access_type: initialData?.access_type || 'free',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode && courseId) {
        await axiosInstance.put(`/courses/${courseId}/`, form);
      } else {
        await axiosInstance.post('/courses/', form);
      }
      router.push('/courses');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Course Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
          fullWidth
        />

        <TextField
          label="Price (optional)"
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          fullWidth
        />

        <TextField
          label="Access Type"
          name="access_type"
          value={form.access_type}
          onChange={handleChange}
          select
          required
          fullWidth
        >
          <MenuItem value="free">Free</MenuItem>
          <MenuItem value="premium">Premium</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          size="large"
        >
          {loading ? <CircularProgress size={24} /> : isEditMode ? 'Update Course' : 'Create Course'}
        </Button>
      </Stack>
    </Box>
  );
};

export default CourseForm;
