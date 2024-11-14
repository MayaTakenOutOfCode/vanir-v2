// src/pages/api/register.ts
import type { APIRoute } from "astro";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
    const { email, password } = await request.json();

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                isAdmin: false, // Set to false by default
            },
        });

        return new Response(
            JSON.stringify({ message: "User registered successfully", user }),
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Error registering user" }),
            { status: 500 }
        );
    }
};
