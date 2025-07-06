// pages/admin-dashboard.tsx

import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminLayout from '@/components/AdminLayout';

const AdminDashboardPage = () => {
  return (
    <>
      <AdminSidebar />
      <Box sx={{ ml: { md: '240px' }, p: 3 }}>
        <AdminLayout>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 8 } }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Welcome to Admin Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here you can manage everything!
              </Typography>
            </Box>
          </Container>
        </AdminLayout>
      </Box>
    </>
  );
};

export default AdminDashboardPage;
