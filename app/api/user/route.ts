import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod';

// Define the schema for user input validation
const UserSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    // Parse and validate request body using the schema
    const body = await req.json();
    const { username, email, password } = UserSchema.parse(body); // Corrected to use UserSchema

    // Check for missing fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { user: null, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if a user with the provided email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Check if a user with the provided username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: { username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists" },
        { status: 409 }
      );
    }

    // Hash the password and create the new user
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Exclude the password from the response
    const { password: newUserPassword, ...rest } = newUser;

    // Return the new user
    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { user: null, message: "Internal server error" },
      { status: 500 }
    );
  }
}
