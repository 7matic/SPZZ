import express from "express";
import { createPosition, deletePosition, getPosition, updatePosition } from "../controllers/positions";
import { verifyAccessToken } from "../../lib/jwt";
import { IGetUserAuthInfoRequest } from "../../lib/types";

const positionRouter = express.Router();

positionRouter.get(`/`, async (req, res) => {
    const { id } = req.query;

    const positions = await getPosition(String(id));

    if(!positions){
        return res.status(400).json({ error: "Positions not found!" });
    }
    res.json(positions);
});

positionRouter.post(`/create`, verifyAccessToken, async (req : IGetUserAuthInfoRequest, res) => {
    const { body } = req;

    const position = await createPosition(body, req.user?.company_id!);

    if(!position){
        return res.status(400).json({ error: "Position not created!" });
    }

    res.json(position);
});

positionRouter.delete(`/delete`, verifyAccessToken , async (req : IGetUserAuthInfoRequest, res) => {
    const { id } = req.query;

    const position = await deletePosition(String(id), req.user?.company_id!);
    
    if(!position){
        return res.status(400).json({ error: "Position not deleted!" });
    }

    res.json(position);
});

positionRouter.put(`/update`, verifyAccessToken, async (req : IGetUserAuthInfoRequest, res) => {
    const { body } = req;
    const { id } = req.query;

    const position = await updatePosition(body, Number(id),  req.user?.company_id!);

    if(!position){
        return res.status(400).json({ error: "Position not updated!" });
    }

    res.json(position);
});

export { positionRouter };