import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import prisma from "../../lib/db";
import { Company } from "@prisma/client";

export async function postCompany(user_id: number, name: string, logo: string, location: string) {
    let company;
    try {
        company = await prisma.company.create({
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
    }
    catch (e) {
        console.log(e);
        return null;
    }
    return company;
}

export async function updateCompany(company: Company, userId: number) {
    let companyFromDb;
    try {
        companyFromDb = await prisma.company.update({
            where: {
                userId: userId
            },
            data: {
                location: company.location,
                logo: company.logo,
                name: company.name,
            }
        });
    }
    catch (e) {
        console.log(e);
        return null;
    }

    return companyFromDb;
}

export async function getCompany(id: string) {
    let company;
    try {
        company = await prisma.company.findUnique({
            where: {
                id: Number(id),
            }
        })
    }
    catch (e) {
        console.log(e);
        return null;
    }

    return company;
}

export async function getAllCompanies() {
    try {
        const companies = await prisma.company.findMany({
            select: {
                id: true,
                name: true,
                logo: true,
                location: true,
            }
        })
        return companies;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getPositions(id: string) {
    try {
        const positions = await prisma.position.findMany({
            where: {
                companyId: Number(id),
            }
        })
        return positions;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function getJobOffers(id: string) {
    let jobOffers;
    try {
        jobOffers = await prisma.jobOffer.findMany({
            where: {
                companyId: Number(id),
            },
            include: {
                position: true,
            }
        })
    }
    catch (e) {
        console.log(e);
        return null;
    }

    return jobOffers;
}

export async function getJobApplicants(jobId: string, companyId: number) {
    let applicants;
    try {
        applicants = await prisma.jobOffer.findUnique({
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
    }
    catch (e) {
        console.log(e);
        return null;
    }

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
