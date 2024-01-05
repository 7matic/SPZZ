import express from 'express';
import prisma from '../../lib/db';

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

userRouter.get(`/user/:id`, async (req, res) => {
    const { id } = req.params

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

userRouter.put(`/user/:id`, async (req, res) => {

});

export { userRouter };