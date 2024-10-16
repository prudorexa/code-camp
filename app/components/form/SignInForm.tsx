'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Use next/navigation for useRouter
import { useToast } from '@/hooks/use-toast';

// Define the form schema
const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: 'Error',
        description: 'Oops! Something went wrong!',
        variant: 'destructive',
      });
    } else {
      router.push('/admin'); // Navigate to the admin page after sign-in
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly">
        or
      </div>
      <div className="w-full mt-6">
        <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
        <FacebookSignInButton>Sign in with Facebook</FacebookSignInButton>
      </div>
      
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don't have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/auth/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
