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
import { green, amber, red } from '@mui/material/colors';
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      main: green[400], //#93DB9A
    },
    MEDIUM: {
      main: amber[600], //#F8B06E
    },
    HARD: {
      main: red[400], //#ED8D8D
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
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

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useQueryClient();
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
