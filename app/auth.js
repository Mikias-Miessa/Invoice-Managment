'use client';
import React, { useEffect } from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';
import withAuth from '@/utils/withAuth';
const Auth = ({ children }) => {
  return (
    <div className='flex flex-row h-screen w-[100%] overflow-hidden'>
      <Sidebar />
      <div className='flex-1 h-screen flex flex-col'>
        <Navbar />
        <div className='bg-white min-h-0 overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default withAuth(Auth);
