import express from 'express';
import { generateAccessToken } from '../../lib/jwt';
import prisma from '../../lib/db';
import { hashPassword, verifyPassword } from '../../lib/auth';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const authRouter = express.Router();

authRouter.post(`/login`, async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            email: true,
            hash: true,
            companyId: true,
            role: true
        }
    });

    if (!user) return res.status(400).json({ "error": "User not found!" });

    const [salt, hash] = user.hash.split(':');

    const isValid = await verifyPassword(password, hash, Buffer.from(salt));

    if (!isValid) return res.status(400).json({ "error": "Invalid password!" });

    const token = generateAccessToken(user.id, user.role, user.companyId ? user.companyId : undefined);
    return res.json({ "accessToken": token });
});

authRouter.post(`/register`, async (req, res) => {
    const { email, password } = req.body;

    let user = undefined;

    try {
        user = await prisma.user.create({
            data: {
                email: email,
                hash: await hashPassword(password)
            },
            select: {
                id: true,
                email: true,
                companyId: true,
                role: true
            }
        });
    }
    catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code == "P2002") {
            return res.status(400).json({ "error": "User already exists!" });
        }
    }

    if (!user) return res.status(400).json({ "error": "User not created!" });

    res.json(user);
});

export { authRouter };