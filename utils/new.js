'use client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Login from '@/app/Login/page';

const withAuth = (Component) => {
  const Auth = (props) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      // No need to handle anything here, this ensures it's a client-side check.
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <Login />;
    }
    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
