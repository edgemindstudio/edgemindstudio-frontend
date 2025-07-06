// utils/auth.ts

// Store tokens in localStorage
export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem('accessToken', access);
  localStorage.setItem('refreshToken', refresh);
};

// Retrieve the access token
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Retrieve the refresh token
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Clear all tokens and user data (if stored)
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user'); // Remove user info if stored
};

/**
 * Refresh the access token using the refresh token.
 * @returns {Promise<string | null>} - The new access token or null if refresh fails.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await res.json();
    setTokens(data.access, refreshToken); // Update access token while keeping the same refresh token
    return data.access;
  } catch (err) {
    clearTokens(); // Clear tokens on failure

    // Optional: redirect to login for seamless UX
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    return null;
  }
};
