import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import Navbar from 'components/Navbar';
import AppContext from 'contexts/AppContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Navbar />
      <Component {...pageProps} />
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
