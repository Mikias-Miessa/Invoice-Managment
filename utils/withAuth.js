import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginPage from '../app/Login/page'; // Import your login component here

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
      // You can add any logic here that needs to be executed when the component mounts
    }, []); // Add dependencies if needed

    if (!isAuthenticated) {
      // If user is not authenticated, render login component
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  Auth.getInitialProps = async (context) => {
    const { store, res } = context;

    // Check if user is authenticated
    const isAuthenticated = !!store.getState().auth.isAuthenticated;

    if (!isAuthenticated) {
      // Redirect to login page on the server
      if (res) {
        res.writeHead(302, { Location: '/Login' });
        res.end();
      }
    }

    return {
      ...(WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(context)
        : {}),
    };
  };

  return Auth;
};

export default withAuth;
