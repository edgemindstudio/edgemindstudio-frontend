// pages/courses/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../hooks/useAuth';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Snackbar,
  Alert,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Lesson {
  id: number;
  title: string;
  video_url: string;
  content: string;
  order: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor_username: string;
  access_type: string;
  price: string;
  lessons: Lesson[];
}

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Lesson>();

  useEffect(() => {
    if (!id) return;
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}/`);
        setCourse(res.data);

        const enrollStatus = await axiosInstance.get(`/courses/${id}/enrolled/`);
        setEnrolled(enrollStatus.data.enrolled);

        if (enrollStatus.data.enrolled) {
          const progressRes = await axiosInstance.get(`/courses/${id}/progress/`);
          setProgress(progressRes.data.progress_percentage || 0);
          setCompletedLessonIds(progressRes.data.completed_lessons || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await axiosInstance.post(`/courses/${id}/enroll/`);
      setSnackbar({ open: true, message: 'Enrolled successfully!', severity: 'success' });
      setEnrolled(true);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Enrollment failed.', severity: 'error' });
    }
  };

  const handleMarkComplete = async (lessonId: number) => {
    try {
      const res = await axiosInstance.post(`/courses/${id}/lessons/${lessonId}/complete/`);
      setProgress(res.data.progress);
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      setSnackbar({ open: true, message: `Lesson marked complete! Progress: ${res.data.progress}%`, severity: 'success' });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to mark lesson complete.', severity: 'error' });
    }
  };

  const openAddLessonDialog = () => {
    reset({ title: '', video_url: '', content: '', order: 1 });
    setEditMode(false);
    setDialogOpen(true);
  };

  const openEditLessonDialog = (lesson: Lesson) => {
    setValue('title', lesson.title);
    setValue('video_url', lesson.video_url);
    setValue('content', lesson.content);
    setValue('order', lesson.order);
    setEditMode(true);
    setEditingLessonId(lesson.id);
    setDialogOpen(true);
  };

  const onSubmit = async (data: Lesson) => {
    try {
      if (editMode && editingLessonId) {
        // Update
        await axiosInstance.put(`/lessons/${editingLessonId}/`, {
          ...data,
          course: id,
        });
        setSnackbar({ open: true, message: 'Lesson updated!', severity: 'success' });
      } else {
        // Create
        const res = await axiosInstance.post(`/lessons/`, {
          ...data,
          course: id,
        });
        setCourse((prev) => prev ? { ...prev, lessons: [...prev.lessons, res.data] } : prev);
        setSnackbar({ open: true, message: 'Lesson added!', severity: 'success' });
      }
      setDialogOpen(false);
      router.reload();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to save lesson.', severity: 'error' });
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await axiosInstance.delete(`/lessons/${lessonId}/`);
      setSnackbar({ open: true, message: 'Lesson deleted!', severity: 'success' });
      setCourse((prev) =>
        prev ? { ...prev, lessons: prev.lessons.filter((l) => l.id !== lessonId) } : prev
      );
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Failed to delete lesson.', severity: 'error' });
    }
  };

  if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  if (!course) return <Typography sx={{ p: 4 }}>Course not found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>{course.title}</Typography>
      <Typography variant="body1" gutterBottom>{course.description}</Typography>
      <Typography variant="body2" gutterBottom><strong>Instructor:</strong> {course.instructor_username}</Typography>
      <Typography variant="body2" gutterBottom><strong>Access:</strong> {course.access_type} {course.price ? `| $${course.price}` : ''}</Typography>

      {enrolled && (
        <Box mt={3}>
          <Typography gutterBottom><strong>📊 Progress:</strong> {progress}%</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5 }} />
        </Box>
      )}

      {!enrolled && (
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleEnroll}>Enroll in Course</Button>
      )}

      {(user?.role === 'admin' || user?.role === 'staff') && (
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ mt: 4 }}
          onClick={openAddLessonDialog}
        >
          Add New Lesson
        </Button>
      )}

      <Typography variant="h5" fontWeight={600} mt={5} gutterBottom>Lessons</Typography>
      {course.lessons.length === 0 ? (
        <Typography>No lessons available yet.</Typography>
      ) : (
        <Grid container spacing={3} mt={1}>
          {course.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
            <Grid item xs={12} key={lesson.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>{lesson.title}</Typography>
                  <Typography variant="body2" gutterBottom>{lesson.content}</Typography>
                  <Button
                    href={lesson.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Watch Video
                  </Button>
                  {enrolled && !completedLessonIds.includes(lesson.id) && (
                    <Button variant="contained" sx={{ mt: 1 }} onClick={() => handleMarkComplete(lesson.id)}>
                      Mark as Complete
                    </Button>
                  )}
                  {(user?.role === 'admin' || user?.role === 'staff') && (
                    <>
                      <IconButton onClick={() => openEditLessonDialog(lesson)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDeleteLesson(lesson.id)}><DeleteIcon /></IconButton>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Lesson Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Lesson' : 'Add Lesson'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Lesson Title"
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Video URL"
              {...register('video_url', { required: 'Video URL is required' })}
              error={!!errors.video_url}
              helperText={errors.video_url?.message}
            />
            <TextField
              label="Content"
              multiline
              rows={3}
              {...register('content', { required: 'Content is required' })}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
            <TextField
              label="Order"
              type="number"
              {...register('order', { required: 'Order is required', min: 1 })}
              error={!!errors.order}
              helperText={errors.order?.message}
            />
            <Button type="submit" variant="contained">{editMode ? 'Update Lesson' : 'Add Lesson'}</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity as 'success' | 'error'}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CourseDetail;
