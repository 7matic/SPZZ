import express, { RequestHandler } from 'express';
import prisma from '../../lib/db';
import { verifyAccessToken } from '../../lib/jwt';
import { IGetUserAuthInfoRequest } from '../../lib/types';

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
                email: String(token)
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
        },
        include: {
            company: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })

    if (result != null)
        res.json(result)
    else
        res.json({ error: "User not found!" })
});

userRouter.put(`/update`, verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
    const { body } = req;

    const result = await prisma.user.update({
        where: {
            id: req.user?.id,
        },
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            location: body.location,
            designations: body.designations,
            colleges: body.colleges,
            degrees: body.degrees,
            workExperience: body.workExperience,
            skills: body.skills,
        }
    });

    if (result != null)
        res.json(result)
    else
        res.json({ error: "Update failed!" });
});

userRouter.get('/withToken', verifyAccessToken as RequestHandler, async (req: IGetUserAuthInfoRequest, res) => {
    res.json(req.user);
});

export { userRouter };
