'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd700'
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
