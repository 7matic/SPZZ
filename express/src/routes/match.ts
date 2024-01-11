import express from 'express';
import prisma from '../../lib/db';
import { getMatch, matchAllJobOffersForUser } from '../controllers/match';

const matchRouter = express.Router();

matchRouter.post(`/match`, async (req, res) => {
    const { userId } = req.body;
    await matchAllJobOffersForUser(userId);
    return res.json({"message": "Matched user to all current job offers!"});
});

matchRouter.get(`/match/:userId/:jobOfferId`, async (req, res) => {
    const { userId, jobOfferId } = req.params

    const result = await getMatch(userId, jobOfferId);

    if (result != null)
        res.json(result)
    else
        res.json({ error: "Match not found!" })
});

export { matchRouter };