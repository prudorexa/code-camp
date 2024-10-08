'use client';

import React from 'react'
import { signIn } from 'next-auth/react';
// import { logIn } from 'next-auth/react';

const page = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('facebook')}>Sign in with Facebook</button>
    </div>
  )
}

export default page