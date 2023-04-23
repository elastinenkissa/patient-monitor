import { Inter } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';

import AppLayout from '@/components/shared/Layout/AppLayout/AppLayout';
import Navbar from '@/components/shared/Navbar/Navbar';

import UserContextProvider from '@/context/UserContext';

import type { AppProps } from 'next/app';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <UserContextProvider>
      <AppLayout className={inter.className}>
        <Navbar />
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </AppLayout>
    </UserContextProvider>
  );
}
