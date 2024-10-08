import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  // Extracting username along with name, email, and password
  const { username, name, email, password } = req.body;

  // Validate that all required fields are provided
  if (!username || !name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,  // Using the username variable
        // name,      // Include the name field if applicable
        email,
        password: hashedPassword,
      },
    });

    // Respond with the created user data
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: 'User creation failed' });
  }
}
