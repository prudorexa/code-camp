'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Button from '../ui/button'; 
import GoogleSignInButton from '../GoogleSignInButton';
import FacebookSignInButton from '../FacebookSignInButton';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const SignUpForm: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    
    if (response.ok) {
      router.push('/auth/sign-in');
    } else {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='johndoe' 
                      {...field} 
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='mail@example.com' 
                      {...field} 
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input 
                      type='password'
                      placeholder='Enter your password'
                      {...field}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Re-Enter your password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='Re-Enter your password'
                      type='password'
                      {...field}
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full mt-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200' type='submit'>
              Sign up
            </Button>
          </form>
        </Form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-300 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-300'>
          or
        </div>
        <GoogleSignInButton className="w-full mb-2">Sign up with Google</GoogleSignInButton>
        <FacebookSignInButton className="w-full mt-2">Sign up with Facebook</FacebookSignInButton>
        <p className='text-center text-sm text-gray-600 mt-4'>
          Already have an account?&nbsp;
          <Link className='text-blue-500 hover:underline' href='/auth/sign-in'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
