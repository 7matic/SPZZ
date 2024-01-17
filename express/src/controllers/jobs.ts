import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../../lib/db";

export async function getSortedJobsWithMatches(
  userId: string,
  sort: string,
  sort_mode: string,
  page: string
) {
  const findOptions = {
    skip: page ? Number(page) * 20 : undefined,
    take: page ? 20 : undefined,
    orderBy:
      sort && sort !== "match" && sort_mode ? { [String(sort)]: String(sort_mode) } : undefined,
  };

  let jobs;

  try {
    jobs = await prisma.jobOffer.findMany({
      include: {
        position: {
          select: {
            requirements: true,
            description: true,
            title: true,
            company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
        applicants: {
          select: {
            id: true,
          }
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
  }
  catch (e) {
    return null;
  }

  if (sort === "match") {
    jobs.sort((a, b) => {
      if (a.matches.length === 0) {
        return 1;
      }
      if (b.matches.length === 0) {
        return -1;
      }
      return sort_mode === 'asc'
        ? Number(a.matches[0].score) - Number(b.matches[0].score)
        : Number(b.matches[0].score) - Number(a.matches[0].score);
    })
  }

  return jobs;
}

export async function deleteJob(id: string, companyId: number) {
  let job;

  try {
    job = await prisma.jobOffer.delete({
      where: {
        id: Number(id),
        companyId: companyId,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
      return null;
    }
  }

  return job;
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
