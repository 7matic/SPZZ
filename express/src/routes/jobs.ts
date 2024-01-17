import express from "express";
import prisma from "../../lib/db";
import { matchAllJobOffersForUser } from "../controllers/match";
import {
  applyToJob,
  deleteJob,
  getSortedJobsWithMatches,
} from "../controllers/jobs";
import { verifyAccessToken } from "../../lib/jwt";
import { IGetUserAuthInfoRequest } from "../../lib/types";

const jobsRouter = express.Router();

jobsRouter.get('/get', async (req, res) => {
  const { id } = req.query;

  const joboffer = await prisma.jobOffer.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (joboffer != null) res.json(joboffer);
  else res.json({ error: "Job not found!" });
});

jobsRouter.get("/all", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
  const { sort, sort_mode, page } = req.query;

  const user_id = req.user?.id;

  const jobs = await getSortedJobsWithMatches(
    String(user_id),
    String(sort),
    String(sort_mode),
    String(page)
  );

  if (jobs != null) res.json(jobs);
  else res.json({ error: "There was a problem with the parameters!" });
});

jobsRouter.post("/create", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
  try {
    const joboffer = await prisma.jobOffer.create({
      data: {
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        companyId: req.user?.company_id!,
        positionId: Number(req.body.positionId),
        salary: Number(req.body.salary),
        active: Boolean(req.body.active),
        location: String(req.body.location),
      },
    });

    return res.json(joboffer);
  }
  catch (e) {
    console.log(e);
    return res.status(400).json({ error: "Job not created!" })
  }
});

jobsRouter.put("/update", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
  const id = req.query.id;
  try {
    const updatedOffer = await prisma.jobOffer.update({
      where: {
        id: Number(id),
        companyId: req.user?.company_id
      },
      data: {
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        salary: Number(req.body.salary),
        active: Boolean(req.body.active),
        location: String(req.body.location),
      },
    });
    res.json(updatedOffer);
  }
  catch (e) {
    console.log(e);
    return res.status(400).json({ error: "Job not found!" })
  }
});

jobsRouter.delete("/delete", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
  const jobId = req.query.id;

  const joboffer = await deleteJob(String(jobId), req.user?.company_id!);

  if (joboffer != null) res.json(joboffer);
  else res.json({ error: "Job not found!" });
});

jobsRouter.post("/apply_job", verifyAccessToken, async (req: IGetUserAuthInfoRequest, res) => {
  const job_id = req.query.id;

  const { applied } = req.body;

  const result = await applyToJob(
    String(job_id),
    String(req.user?.id),
    Boolean(applied)
  );

  if (result != null) res.json("Job updated!");
  else res.status(500).json({ error: "Job not found!" });
});

export { jobsRouter };
