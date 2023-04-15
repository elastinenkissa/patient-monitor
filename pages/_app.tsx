import { Inter } from 'next/font/google';

import AppLayout from '@/components/shared/Layout/AppLayout/AppLayout';
import Navbar from '@/components/shared/Navbar/Navbar';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

import type { AppProps } from 'next/app';
import UserContextProvider from '@/context/UserContext';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <UserContextProvider>
      <AppLayout className={inter.className}>
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </AppLayout>
    </UserContextProvider>
  );
}
