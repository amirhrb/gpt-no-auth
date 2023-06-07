import '../styles/globals.css';

import { Toaster } from 'react-hot-toast';

import yekan from '../public/fonts/yekan';
import colfax from '../public/fonts/colfax';

export default function MyApp({ Component, pageProps }) {
  return (
    <div
      className={`min-h-screen ${yekan.variable} ${colfax.variable}`}
      dir="rtl"
    >
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </div>
  );
}
