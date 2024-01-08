import express from "express";
import { getConversation, getConversations, sendMessage } from "../controllers/messages";

const messageRouter = express.Router();

messageRouter.post(`/`, async (req, res) => {
    const { sentFrom, sentTo, content } = req.body;

    const user = await sendMessage(sentFrom, sentTo, content);

    if(user != null)
        res.json(user)
    else
        res.json({ error: "Message not sent!" })
});

messageRouter.get('/conversation', async (req, res) => {
    const { user1, user2 } = req.query;

    const messages = await getConversation(Number(user1), Number(user2));

    if(messages != null)
        res.json(messages)
    else
        res.json({ error: "Conversation not found!" })
});

messageRouter.get('/conversations', async (req, res) => {
    const { userId } = req.query;

    const messages = await getConversations(Number(userId));

    if(messages != null)
        res.json(messages)
    else
        res.json({ error: "Conversation not found!" })
});

export {messageRouter};