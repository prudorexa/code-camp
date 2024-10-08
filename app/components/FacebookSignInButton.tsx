import { FC, ReactNode } from 'react';
import Button from './ui/button';

interface FacebookSignInButtonProps {
  children: ReactNode;
}

const FacebookSignInButton: FC<FacebookSignInButtonProps> = ({ children }) => {
  const loginWithFacebook = () => {
    console.log('Login with Facebook');
  };

  return (
    <Button onClick={loginWithFacebook} className='w-full bg-blue-600 text-white hover:bg-blue-700'>
      {children}
    </Button>
  );
};

export default FacebookSignInButton;
