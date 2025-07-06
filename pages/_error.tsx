// pages/_error.tsx

import { NextPageContext } from 'next';
import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>
        {statusCode ? `⚠️ ${statusCode}` : '⚠️ Error'}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {statusCode === 404
          ? 'Page Not Found'
          : 'An unexpected error has occurred'}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {statusCode === 404
          ? 'The page you are looking for does not exist.'
          : 'Something went wrong. Please try again later.'}
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

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
