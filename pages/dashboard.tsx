// pages/dashboard.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../hooks/useAuth';
import { isAdmin, isStaff, isStudent } from '../utils/roleUtils';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Stack,
} from '@mui/material';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Dashboard = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const testAuthCall = async () => {
      try {
        const res = await axiosInstance.get('/user-data/');
        console.log('Protected data:', res.data);
      } catch (err) {
        console.error('Token error:', err);
      }
    };

    testAuthCall();
  }, []);

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography align="center">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Welcome to the Dashboard
      </Typography>

      <Stack spacing={2} mt={4}>
        <Typography>
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Role:</strong> {user.role}
        </Typography>

        {isAdmin(user.role) && (
          <Alert severity="info">
            👑 Admin Access: You can manage users, courses, and site settings.
          </Alert>
        )}
        {isStaff(user.role) && (
          <Alert severity="info">
            📚 Staff Access: You can upload courses and manage content.
          </Alert>
        )}
        {isStudent(user.role) && (
          <Alert severity="info">
            🎓 Student Access: Browse and enroll in courses.
          </Alert>
        )}

        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
