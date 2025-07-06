// components/landing/SocialLinks.tsx

import React from 'react';
import { Box, Typography, Container, Grid, Link as MUILink, Stack } from '@mui/material';
import {
  FaYoutube, FaTiktok, FaFacebook, FaInstagram, FaGithub, FaTwitter, FaDiscord, FaLinkedin, FaReddit,
  FaPinterest, FaTwitch, FaMedium, FaSnapchatGhost, FaTelegram, FaWhatsapp, FaDribbble, FaGlobe
} from 'react-icons/fa';

const platforms = [
  { href: 'https://youtube.com/@edgemindstudio', icon: <FaYoutube />, name: 'YouTube' },
  { href: 'https://tiktok.com/@edgemindstudio', icon: <FaTiktok />, name: 'TikTok' },
  { href: 'https://facebook.com/edgemindstudio', icon: <FaFacebook />, name: 'Facebook' },
  { href: 'https://instagram.com/edgemindstudio', icon: <FaInstagram />, name: 'Instagram' },
  { href: 'https://github.com/edgemindstudio', icon: <FaGithub />, name: 'GitHub' },
  { href: 'https://x.com/edgemindstudio', icon: <FaTwitter />, name: 'X (Twitter)' },
  { href: 'https://discord.gg/edgemindstudio', icon: <FaDiscord />, name: 'Discord' },
  { href: 'https://linkedin.com/company/edgemindstudio', icon: <FaLinkedin />, name: 'LinkedIn' },
  { href: 'https://reddit.com/r/edgemindstudio', icon: <FaReddit />, name: 'Reddit' },
  { href: 'https://pinterest.com/edgemindstudio', icon: <FaPinterest />, name: 'Pinterest' },
  { href: 'https://twitch.tv/edgemindstudio', icon: <FaTwitch />, name: 'Twitch' },
  { href: 'https://medium.com/@edgemindstudio', icon: <FaMedium />, name: 'Medium' },
  { href: 'https://snapchat.com/add/edgemindstudio', icon: <FaSnapchatGhost />, name: 'Snapchat' },
  { href: 'https://t.me/edgemindstudio', icon: <FaTelegram />, name: 'Telegram' },
  { href: 'https://wa.me/1234567890', icon: <FaWhatsapp />, name: 'WhatsApp' },
  { href: 'https://dribbble.com/edgemindstudio', icon: <FaDribbble />, name: 'Dribbble' },
  { href: 'https://edgemindstudio.com', icon: <FaGlobe />, name: 'Website' },
];

const SocialLinks = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        textAlign: 'center',
        bgcolor: 'grey.900',
        borderTop: 1,
        borderColor: 'grey.800',
      }}
    >
      <Container>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          🌐 Follow Us Everywhere
        </Typography>
        <Grid container spacing={2} justifyContent="center" mt={2}>
          {platforms.map(({ href, icon, name }) => (
            <Grid item key={name}>
              <MUILink
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1.25rem',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {icon}
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, fontSize: '0.9rem' }}>
                  {name}
                </Box>
              </MUILink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SocialLinks;
