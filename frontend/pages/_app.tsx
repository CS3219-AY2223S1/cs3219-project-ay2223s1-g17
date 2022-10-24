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
import { green, amber, red, blue } from '@mui/material/colors';

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
      main: amber[400], //#F8B06E
    },
    HARD: {
      main: red[400], //#ED8D8D
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
