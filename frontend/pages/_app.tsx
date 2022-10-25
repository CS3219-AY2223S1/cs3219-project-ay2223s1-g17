import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Navbar from 'components/Navbar';
import AppContext from 'contexts/AppContext';
import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
  ThemeProvider,
} from '@mui/material';
import { green, amber, red, grey } from '@mui/material/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

declare module '@mui/material/styles' {
  interface Palette {
    EASY: PaletteColor;
    MEDIUM: PaletteColor;
    HARD: PaletteColor;
  }
  interface PaletteOptions {
    EASY: PaletteColorOptions;
    MEDIUM: PaletteColorOptions;
    HARD: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    EASY: true;
    MEDIUM: true;
    HARD: true;
  }
}

const theme = createTheme({
  palette: {
    EASY: {
      light: green[100],
      main: green[400],
      dark: green[700],
    },
    MEDIUM: {
      light: amber[100],
      main: amber[600],
      dark: amber[900],
    },
    HARD: {
      light: red[100],
      main: red[400],
      dark: red[700],
    },
    secondary: {
      light: grey[400],
      main: grey[500],
      dark: grey[600],
    },
  },
  typography: {
    fontFamily: 'Raleway',
    body1: {
      fontFamily: 'Inter',
    },
    body2: {
      fontFamily: 'Inter',
    },
    caption: {
      fontFamily: 'Inter',
    },
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
        <ToastContainer
          position="bottom-left"
          draggable={false}
          pauseOnHover={false}
          theme="colored"
          newestOnTop
          closeOnClick
        />
      </AppContext>
    </QueryClientProvider>
  );
}

export default MyApp;
