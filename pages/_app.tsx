import { Inter, Roboto } from 'next/font/google';

import AppLayout from '@/components/UI/Layout/AppLayout/AppLayout';
import Navbar from '@/components/UI/Navbar/Navbar';

import '@/styles/globals.css';

const roboto = Roboto({ weight: '700', subsets: ['latin'] });

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout className={roboto.className}>
      <Navbar />
      <Component {...pageProps} />
    </AppLayout>
  );
}
