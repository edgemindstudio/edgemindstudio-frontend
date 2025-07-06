// hooks/useAuth.ts

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken, clearTokens } from '../utils/auth';

interface DecodedToken {
  exp: number;
}

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getAccessToken();

      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          const now = Math.floor(Date.now() / 1000);
          if (decoded.exp < now) {
            clearTokens();
            localStorage.removeItem('user');
            setUser(null);
            router.replace('/login');
            return;
          }
        } catch (err) {
          console.error('Invalid token:', err);
          clearTokens();
          localStorage.removeItem('user');
          setUser(null);
          router.replace('/login');
          return;
        }
      }

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    clearTokens();
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = !!user;

  return { user, logout, isAuthenticated, loading };
};
