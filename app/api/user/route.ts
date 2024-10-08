import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, name, email, password } = body; // Destructure username

        if (!username || !name || !email || !password) {
            return NextResponse.json({ user: null, message: "All fields are required" }, { status: 400 });
        }

        const existingUserByEmail = await db.user.findUnique({
            where: { email: email },
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 });
        }

        const existingUserByUsername = await db.user.findUnique({
            where: { username: username },
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username, 
                email,
                password: hashedPassword, 
            },
        });

        const { password: newUserPassword, ...rest } = newUser; 

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 }); 
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ user: null, message: "Internal server error" }, { status: 500 }); 
    }
}
