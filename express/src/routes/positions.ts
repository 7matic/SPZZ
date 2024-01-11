import express from "express";
import { createPosition, deletePosition, getPosition, updatePosition } from "../controllers/positions";

const positionRouter = express.Router();

positionRouter.get(`/`, async (req, res) => {
    const { id } = req.query;

    const positions = await getPosition(String(id));

    res.json(positions);
});

positionRouter.post(`/`, async (req, res) => {
    const { body } = req;

    const position = await createPosition(body);

    res.json(position);
});

positionRouter.delete(`/`, async (req, res) => {
    const { id } = req.query;

    const position = await deletePosition(String(id));
    
    res.json(position);
});

positionRouter.put(`/`, async (req, res) => {
    const { body } = req;

    const position = await updatePosition(body);

    res.json(position);
});

export { positionRouter };