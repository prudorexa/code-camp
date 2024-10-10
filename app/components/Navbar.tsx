import Link from 'next/link';
import { buttonVariants } from './ui/button'; // Correct path
import { HandMetal } from 'lucide-react';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from './UserAccountNav';
import { signOut } from 'next-auth/react';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-zinc-100 py-4 border-b border-s-zinc-200 fixed w-full z-10 top-0 shadow-md '>
      <div className='container mx-auto flex items-center justify-between px-4'>
        <Link href='/' className='flex items-center space-x-2'>
          <HandMetal className='text-blue-600 h-6 w-6' /> {/* Icon styling */}
          <span className='text-lg font-semibold text-gray-800'>Top Camp</span> {/* App name */}
        </Link>
        <div className='flex items-center space-x-4'>
          {session?.user ? (
            <UserAccountNav />
          ) : (
            <Link className={`${buttonVariants()} text-white bg-blue-600 hover:bg-blue-700 transition duration-200 `} href='/auth/sign-in'>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
