import express, { RequestHandler } from 'express';
import { chooseApplicants, getAllCompanies, getCompany, getJobApplicants, getPositions, postCompany, updateCompany } from '../controllers/company';
import { verifyAccessToken } from '../../lib/jwt';
import { IGetUserAuthInfoRequest } from '../../lib/types';

const companyRouter = express.Router();

companyRouter.get('/', async (req, res) => {
    const { id } = req.query;

    const company = await getCompany(String(id));

    if (company != null)
        res.json(company)
    else
        res.json({ error: "Company not found!" })
});

companyRouter.post('/create', verifyAccessToken as RequestHandler, async (req: IGetUserAuthInfoRequest, res) => {
    const { name, logo, location } = req.body;

    const user_id = req.user?.id;

    const company = await postCompany(Number(user_id), name, logo, location);

    if (company != null)
        res.json(company)
    else
        res.json({ error: "Company not found!" })
});

companyRouter.put('/update', verifyAccessToken as RequestHandler, async (req: IGetUserAuthInfoRequest, res) => {
    const { body } = req;

    const company = await updateCompany(body, req.user?.id!);

    if (company)
        res.json(company);
    else
        res.status(500).json({ error: "Company not updated!" })
})

companyRouter.get('/positions', async (req, res) => {
    const { id } = req.query;

    const positions = await getPositions(String(id));

    if (positions != null)
        res.json(positions)
    else
        res.json({ error: "Positions not found!" })
});

companyRouter.get('/all', async (req, res) => {
    const companies = await getAllCompanies();

    if (companies != null)
        res.json(companies)
    else
        res.json({ error: "Companies not found!" })
});

companyRouter.get("/get-job-applicants", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
    const jobId = req.query.id;

    const applicants = await getJobApplicants(String(jobId), req.user?.company_id!);

    if (applicants != null) res.json(applicants);
    else res.json({ error: "Applicants not found!" });
});

companyRouter.post("/choose-applicants", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
    const jobId = req.query.id;

    const user_id = req.user?.id;

    const { company_id } = req.user!;

    const response = await chooseApplicants(company_id!, Number(jobId), Number(user_id));

    if (response != null) res.json("Job updated!");
    else res.json({ error: "Job not found!" });
});

export { companyRouter };