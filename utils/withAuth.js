import { useEffect, useState } from 'react';
import Login from '@/app/Login/page'; // Adjust the path to your Login component
import { Bars } from 'react-loader-spinner';
const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      }
    }, []);

    if (isLoading) {
      return (
        <div className='flex items-center justify-center h-screen bg-white'>
          <Bars
            height='40'
            width='40'
            color='#FF7F00'
            ariaLabel='bars-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      ); // Render a loading state while checking authentication
    }

    // If user is not logged in, return login component
    if (!isAuthenticated) {
      return <Login />;
    }

    // If user is logged in, return original component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
