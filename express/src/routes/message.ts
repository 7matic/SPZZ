import express from "express";
import { getConversation, getConversations, sendMessage } from "../controllers/messages";
import { verifyAccessToken } from "../../lib/jwt";
import { IGetUserAuthInfoRequest } from "../../lib/types";

const messageRouter = express.Router();

messageRouter.post(`/send`, verifyAccessToken, async (req : IGetUserAuthInfoRequest, res) => {
    const { sentTo, content } = req.body;

    const user = await sendMessage(req.user?.id!, sentTo, content);

    if(user != null)
        res.json(user)
    else
        res.json({ error: "Message not sent!" })
});

messageRouter.get('/conversation', verifyAccessToken, async (req : IGetUserAuthInfoRequest, res) => {
    const {  user2 } = req.query;

    const messages = await getConversation(req.user?.id!, Number(user2));

    if(messages != null)
        res.json(messages)
    else
        res.json({ error: "Conversation not found!" })
});

messageRouter.get('/conversations', verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {

    const messages = await getConversations(req.user?.id!);

    if(messages != null)
        res.json(messages)
    else
        res.json({ error: "Conversation not found!" })
});

export {messageRouter};