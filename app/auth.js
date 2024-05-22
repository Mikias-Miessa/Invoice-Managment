'use client';
import React, { useEffect } from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
import withAuth from '@/utils/withAuth';
import { usePathname } from 'next/navigation';
const Auth = ({ children }) => {
  const pathname = usePathname();

  const shouldShowNavAndSidebar =
    pathname !== '/Login' && pathname !== '/Register';

  return (
    <div className='flex flex-row h-screen w-[100%] overflow-hidden'>
      {shouldShowNavAndSidebar && <Sidebar />}

      <div className='flex-1 h-screen flex flex-col'>
        {shouldShowNavAndSidebar && <Navbar />}

        <div className='bg-white min-h-0 overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default withAuth(Auth);
