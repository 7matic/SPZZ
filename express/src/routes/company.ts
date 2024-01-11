import express from 'express';
import { getCompany, getPositions, postCompany } from '../controllers/company';

const companyRouter = express.Router();

companyRouter.get('/', async (req, res) => {
    const { id } = req.query;

    const company = await getCompany(String(id));

    if (company != null)
        res.json(company)
    else
        res.json({ error: "Company not found!" })
});

companyRouter.post('/create', async (req, res) => {
    const { name, logo, location } = req.body;

    const company = await postCompany(name, logo, location);

    if (company != null)
        res.json(company)
    else
        res.json({ error: "Company not found!" })
});

companyRouter.get('/positions', async (req, res) => {
    const { id } = req.query;

    const positions = await getPositions(String(id));

    if (positions != null)
        res.json(positions)
    else
        res.json({ error: "Positions not found!" })
});

export { companyRouter };