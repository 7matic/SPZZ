import express from 'express';
import { getMatch, matchAllJobOffersForUser } from '../controllers/match';
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

export { matchRouter };