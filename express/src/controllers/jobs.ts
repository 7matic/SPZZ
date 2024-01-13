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
