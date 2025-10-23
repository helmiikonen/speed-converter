import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#e1e5ff',
      main: '#596ec0',
      dark: '#00096c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffe1e5',
      main: '#df3052',
      dark: '#7e0030',
      contrastText: '#000',
    },
  },
});