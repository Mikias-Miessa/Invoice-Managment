import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import StoreProvider from '@/store/storeProvider';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Invoice Managment',
  description: 'Invoice managemet app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreProvider>
          <Auth children={children} />
        </StoreProvider>
      </body>
    </html>
  );
}
