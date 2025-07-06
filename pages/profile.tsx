// pages/profile.tsx

import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ username: '', email: '' });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (user) {
      setForm({ username: user.username, email: user.email });
      if (user.profile_picture) {
        setPreview(user.profile_picture);
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    if (profilePic) {
      formData.append('profile_picture', profilePic);
    }

    try {
      await axiosInstance.put('/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSnackbar({
        open: true,
        message: '✅ Profile updated successfully!',
        severity: 'success',
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: 'Failed to update profile.',
        severity: 'error',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <Typography align="center">Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
        👤 Profile
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}
      >
        <TextField
          label="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          fullWidth
          required
        />

        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
          required
        />

        <Button variant="outlined" component="label">
          Upload Profile Picture
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>

        {preview && (
          <Box textAlign="center">
            <Typography variant="body2" gutterBottom>
              👁️ Preview:
            </Typography>
            <Avatar
              src={preview}
              alt="Profile Preview"
              sx={{ width: 100, height: 100, margin: '0 auto' }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" size="large">
          Save Changes
        </Button>
      </Box>

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

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
