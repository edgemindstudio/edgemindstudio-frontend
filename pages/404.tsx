// pages/404.tsx

import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        🕵️‍♂️ 404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Sorry, the page you are looking for does not exist or has been moved.
      </Typography>

      <Box mt={4}>
        <Link href="/" passHref>
          <Button variant="contained" size="large">
            Go to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
