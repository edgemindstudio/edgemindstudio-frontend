// pages/index.tsx

import Head from 'next/head';
import { Box } from '@mui/material';
import Hero from '@/components/landing/Hero';
import Topics from '@/components/landing/Topics';
import Workflow from '@/components/landing/Workflow';
import FeaturedCourses from '@/components/landing/FeaturedCourses';
import VisualDemo from '@/components/landing/VisualDemo';
import CTA from '@/components/landing/CTA';
import Testimonials from '@/components/landing/Testimonials';
import SocialProof from '@/components/landing/SocialProof';
import NewsletterSignup from '@/components/landing/NewsletterSignup';
import SocialLinks from '@/components/landing/SocialLinks';

export default function Home() {
  return (
    <>
      <Head>
        <title>EdgeMind Studio | Learn AI, Data Science & Statistics</title>
        <meta
          name="description"
          content="Visual-first learning platform for AI, data science, and statistics."
        />
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          bgcolor: 'black',
          color: 'white',
        }}
      >
        <Hero />
        <Topics />
        <Workflow />
        <FeaturedCourses />
        <VisualDemo />
        <CTA />
        <Testimonials />
        <SocialProof />
        <NewsletterSignup />
        <SocialLinks />
      </Box>
    </>
  );
}
