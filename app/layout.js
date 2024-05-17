import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Invoice Managment',
  description: 'Invoice managemet app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex flex-row h-screen w-screen overflow-hidden'>
          <Sidebar />
          <div className='flex-1 h-screen flex flex-col'>
            <Navbar />
            <div className='bg-white min-h-0 overflow-auto'>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
