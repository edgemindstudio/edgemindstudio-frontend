// components/Layout.tsx

import { ReactNode } from 'react';
import Navbar from './landing/Navbar';
import Footer from './Footer';
import { Box, Container } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ py: { xs: 3, md: 6 } }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
