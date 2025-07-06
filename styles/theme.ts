// styles/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#0070F3',
        light: '#00CFFF',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#00C853',
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'light' ? '#FFFFFF' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#121212' : '#FFFFFF',
        secondary: '#5f6368',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: { fontWeight: 700, fontSize: '2.5rem' },
      h2: { fontWeight: 600, fontSize: '2rem' },
      h3: { fontWeight: 600, fontSize: '1.75rem' },
      body1: { fontSize: '1rem' },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
      MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
    },
  });

export default theme;
