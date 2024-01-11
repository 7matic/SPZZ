import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../../lib/db";

export async function getSortedJobsWithMatches(
  userId: string,
  sort: string,
  sort_mode: string,
  page: string
) {
  const findOptions = {
    skip: page ? Number(page) * 10 : undefined,
    take: page ? 10 : undefined,
    orderBy:
      sort && sort_mode ? { [String(sort)]: String(sort_mode) } : undefined,
  };

  const jobs = await prisma.jobOffer.findMany({
    include: {
      position: {
        select: {
          company: {
            select: {
              name: true,
            },
          },
        },
      },
      matches: {
        select: {
          score: true,
        },
        where: {
          userId: Number(userId),
        },
      },
    },
    ...findOptions,
  });

  return jobs;
}

export async function applyToJob(
  job_id: string,
  user_id: string,
  applied: boolean
) {
  let result;

  try {
    result = await prisma.jobOffer.update({
      where: {
        id: Number(job_id),
      },
      data: {
        applicants: {
          ...(applied
            ? {
                connect: {
                  id: Number(user_id),
                },
              }
            : {
                disconnect: {
                  id: Number(user_id),
                },
              }),
        },
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2016") {
      result = null;
    }
  }
  return result;
}

export async function getJobApplicants(jobId: string) {
  const applicants = await prisma.jobOffer.findUnique({
    where: {
      id: Number(jobId),
    },
    select: {
      applicants: {
        select: {
            firstName: true,
            lastName: true,
            matches: {
                where: {
                    jobOfferId: Number(jobId),
                },
                select: {
                    score: true,
                }
            }
        }
      }
    },
  });
  
  return applicants;
}
