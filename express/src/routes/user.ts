import express from 'express';
import prisma from '../../lib/db';
// import { checkJwt } from '..';

const userRouter = express.Router();

userRouter.post(`/user`, async (req, res) => {
    const { email, token } = req.body

    let result = null;

    if (email) {
        result = await prisma.user.findUnique({
            where: {
                email: String(email),
            }
        })
    }
    else if (token) {
        result = await prisma.user.findUnique({
            where: {
                auth0token: String(token)
            }
        })
    }

    if (result != null)
        res.json(result)
    else
        res.json({ error: "User not found!" })
})

userRouter.get(`/`, async (req, res) => {
    const { id } = req.query;

    const result = await prisma.user.findUnique({
        where: {
            id: Number(id),
        }
    })

    if (result != null)
        res.json(result)
    else
        res.json({ error: "User not found!" })
});

export { userRouter };