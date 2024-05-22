import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname hooks
import Login from '@/app/Login/page';
import Register from '@/app/Register/page';
import { Bars } from 'react-loader-spinner';

const withAuth = (Component) => {
  const Auth = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter(); // Initialize useRouter hook
    const pathname = usePathname(); // Get the current route

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (
        isAuthenticated &&
        (pathname === '/Login' || pathname === '/Register')
      ) {
        router.push('/'); // Redirect to '/' if authenticated and on /Login or /Register
      }
    }, [isAuthenticated, pathname]); // Run this effect when isAuthenticated or pathname changes

    if (!isClient) {
      return (
        <div className='flex items-center justify-center h-screen bg-white'>
          <Bars
            height='40'
            width='40'
            color='#008000'
            ariaLabel='bars-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      ); // Render nothing until client-side
    }

    if (!isAuthenticated && pathname !== '/Login' && pathname !== '/Register') {
      return <Login />; // Render Login if not authenticated and not on /Login or /Register
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
