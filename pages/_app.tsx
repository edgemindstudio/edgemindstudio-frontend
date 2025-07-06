// pages/_app.tsx

import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import Layout from '../components/Layout';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export default function App({ Component, pageProps }: AppProps) {
  // Light mode for now; will add toggle later
  const [mode] = useState<'light' | 'dark'>('light');

  return (
    <>
      <Head>
        <title>EdgeMind Studio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
}
