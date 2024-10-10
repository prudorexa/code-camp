// app/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    // Validate the input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Simulate a user creation process
    try {
      // Replace this with your actual user creation logic
      // For example, saving the user to a database
      console.log('Creating user:', { username, email, password });
      return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
