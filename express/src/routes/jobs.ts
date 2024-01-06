import express from "express";
import prisma from "../../lib/db";
import { matchAllJobOffersForUser } from "../controllers/match";
import {
  applyToJob,
  getJobApplicants,
  getSortedJobsWithMatches,
} from "../controllers/jobs";

const jobsRouter = express.Router();

jobsRouter.get("/", async (req, res) => {
  const { user_id, sort, sort_mode, page } = req.query;

  await matchAllJobOffersForUser(String(user_id));
  const jobs = await getSortedJobsWithMatches(
    String(user_id),
    String(sort),
    String(sort_mode),
    String(page)
  );

  if (jobs != null) res.json(jobs);
  else res.json({ error: "Jobs not found!" });
});

jobsRouter.post("/", async (req, res) => {
  const joboffer = await prisma.jobOffer.create({
    data: {
      companyId: Number(req.body.companyId),
      positionId: Number(req.body.positionId),
      salary: Number(req.body.salary),
      active: Boolean(req.body.active),
      location: String(req.body.location),
    },
  });

  if (joboffer != null) res.json(joboffer);
  else res.json({ error: "Job not found!" });
});

jobsRouter.put("/", async (req, res) => {
  const jobId = req.query.id;

  const joboffer = await prisma.jobOffer.update({
    where: {
      id: Number(jobId),
    },
    data: {
      companyId: Number(req.body.companyId),
      positionId: Number(req.body.positionId),
      salary: Number(req.body.salary),
      active: Boolean(req.body.active),
      location: String(req.body.location),
    },
  });

  if (joboffer != null) res.json(joboffer);
  else res.json({ error: "Job not found!" });
});

jobsRouter.delete("/", async (req, res) => {
  const jobId = req.query.id;

  const joboffer = await prisma.jobOffer.delete({
    where: {
      id: Number(jobId),
    },
  });

  if (joboffer != null) res.json(joboffer);
  else res.json({ error: "Job not found!" });
});

jobsRouter.post("/apply_job", async (req, res) => {
  const job_id = req.query.id;

  const { user_id, applied } = req.body;

  const result = await applyToJob(
    String(job_id),
    String(user_id),
    Boolean(applied)
  );

  if (result != null) res.json("Job updated!");
  else res.status(500).json({ error: "Job not found!" });
});

jobsRouter.get("/apply_job", async (req, res) => {
  const jobId = req.query.id;

  const applicants = await getJobApplicants(String(jobId));

  if (applicants != null) res.json(applicants);
  else res.json({ error: "Applicants not found!" });
});

jobsRouter.post("/choose-applicants", async (req, res) => {
  const jobId = req.query.id;

  const { user_id } = req.body;

  const response = await prisma.jobOffer.update({
    where: {
      id: Number(jobId),
    },
    data: {
      active: false,
      position: {
        update: {
          heldBy: {
            connect: {
              id: Number(user_id),
            }
          },
          isFilled: true,
          startDate: new Date(),
          endDate: undefined
        }
      },
    },
  });

  if (response != null) res.json("Job updated!");
  else res.json({ error: "Job not found!" });
});

export { jobsRouter };
