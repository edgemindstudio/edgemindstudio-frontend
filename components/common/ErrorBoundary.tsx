// components/common/ErrorBoundary.tsx

import React, { Component, ReactNode } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🔥 Error Boundary Caught:', error, errorInfo);
    // Optionally: send error + errorInfo to Sentry or other services here
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            😕 Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            An unexpected error occurred. Please try again.
          </Typography>
          <Box mt={4}>
            <Button onClick={this.handleReload} variant="contained" sx={{ mr: 2 }}>
              Reload Page
            </Button>
            <Link href="/" passHref>
              <Button variant="outlined">Go Home</Button>
            </Link>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
