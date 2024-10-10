import { FC, ReactNode } from 'react';
import Button from './ui/button';

interface FacebookSignInButtonProps {
  className?: string; // Make className optional
  children: ReactNode;
}

const FacebookSignInButton: FC<FacebookSignInButtonProps> = ({ className, children }) => {
  const loginWithFacebook = () => {
    console.log('Login with Facebook');
    // Add your Facebook login logic here
  };

  return (
    <Button onClick={loginWithFacebook} className={`bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800 transition duration-200 ${className}`}>
      {children}
    </Button>
  );
};

export default FacebookSignInButton;
