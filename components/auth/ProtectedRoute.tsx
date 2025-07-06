// components/auth/ProtectedRoute.tsx

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean; // restricts to admin/staff if true
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for loading to complete before checking

    if (!user) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔒 Redirecting to /login (unauthenticated)');
      }
      router.replace('/login');
    } else if (adminOnly && !['admin', 'staff'].includes(user.role)) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔒 Redirecting to /403 (adminOnly restriction)');
      }
      router.replace('/403');
    }
  }, [user, loading, router, adminOnly]);

  if (loading || (!user && !loading) || (adminOnly && user && !['admin', 'staff'].includes(user.role))) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress aria-label="Loading protected content" />
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
