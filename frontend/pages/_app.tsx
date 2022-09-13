import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from 'contexts/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-center" />
    </AuthProvider>
  );
}

export default MyApp;
