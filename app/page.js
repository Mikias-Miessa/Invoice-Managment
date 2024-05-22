'use client';
import Dashboard from '@/components/dashboard/dashboard';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen w-[100%] pt-4 pl-5'>
      <Dashboard />
    </main>
  );
}
