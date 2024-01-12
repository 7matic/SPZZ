import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../../lib/db";

export async function postCompany(user_id: number, name: string, logo: string, location: string) {
    const company = await prisma.company.create({
        data: {
            name: name,
            logo: logo,
            location: location,
            user: {
                connect: {
                    id: user_id,
                }
            }
        },
    })
    return company;
}

export async function getCompany(id: string) {
    const company = await prisma.company.findUnique({
        where: {
            id: Number(id),
        }
    })
    return company;
}

export async function getAllCompanies() {
    const companies = await prisma.company.findMany({
        select: {
            id: true,
            name: true,
            logo: true,
            location: true,
        }
    })

    return companies;
}

export async function getPositions(id: string) {
    const positions = await prisma.position.findMany({
        where: {
            companyId: Number(id),
        }
    })

    return positions;
}

export async function getJobApplicants(jobId: string, companyId: number) {
    const applicants = await prisma.jobOffer.findUnique({
        where: {
            id: Number(jobId),
            companyId: companyId,
        },
        select: {
            applicants: {
                select: {
                    id: true,
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

export async function chooseApplicants(companyId: number, jobId: number, user_id: number) {

    let jobOffer;

    try {
        jobOffer = await prisma.jobOffer.update({
            where: {
                id: Number(jobId),
                companyId: companyId
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
    } catch (e) {
        console.log(e);
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
            return null;
        }
    }

    return jobOffer;
}