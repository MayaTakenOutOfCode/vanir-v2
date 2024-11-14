import bcrypt from 'bcrypt';

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function registerUser(email: string, plainTextPwd: string) {
    const hashedPassword = await bcrypt.hash(plainTextPwd, 10);

    const user = await prisma.users.create({
        data: {
            email,
            password: hashedPassword,
            isAdmin: false
        }
    })

    return user;
}