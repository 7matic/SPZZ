import express from 'express';
import { calculateMatchesForJob, getMatch, matchAllJobOffersForUser } from '../controllers/match';
import { verifyAccessToken } from '../../lib/jwt';
import { IGetUserAuthInfoRequest } from '../../lib/types';

const matchRouter = express.Router();

matchRouter.get(`/match`, verifyAccessToken, async (req : IGetUserAuthInfoRequest, res) => {
    const jobOffers = await matchAllJobOffersForUser(Number(req.user?.id));

    if(!jobOffers){
        return res.json({error: "User skills not found! Please upload CV!"})
    }

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

matchRouter.get('/matchJobToUsers', async (req, res) => {
    const jobOfferId = req.query.id as string;

    await calculateMatchesForJob(jobOfferId);

    res.json({ message: "Matched all users to job offer!" });
});

export { matchRouter };