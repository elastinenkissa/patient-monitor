import { Inter } from 'next/font/google';

import AppLayout from '@/components/shared/Layout/AppLayout/AppLayout';
import Navbar from '@/components/shared/Navbar/Navbar';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

import type { AppProps } from 'next/app';
import UserContextProvider from '@/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <AppLayout className={inter.className}>
        <Navbar />
        <Component {...pageProps} />
      </AppLayout>
    </UserContextProvider>
  );
}
