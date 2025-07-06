// pages/403.tsx

import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

export default function UnauthorizedPage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        🚫 403
      </Typography>
      <Typography variant="h5" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        You do not have permission to view this page. If you believe this is a mistake,
        please contact support or return to the homepage.
      </Typography>

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Link href="/" passHref>
          <Button variant="contained" size="large">
            Go to Home
          </Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button variant="outlined" size="large">
            My Dashboard
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
