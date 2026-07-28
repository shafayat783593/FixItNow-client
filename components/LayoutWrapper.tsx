'use client';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { ReactNode } from 'react';
import Navbar from './shared/Navbar';

export default function LayoutWrapper({ children }:{children:ReactNode}) {
  const pathname = usePathname();


  const hideNavFooter = ['/customer', '/admin', '/technicial', '/login', '/register', '/verify', '/reset-password', '/Forgot-password'].some(
    (path) => pathname.startsWith(path)
  );

  if (hideNavFooter) {
    return <>{children}</>;
  }

  return (
      <>
      <Navbar key={pathname} />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* <Footer /> */}

    </>
  );
}