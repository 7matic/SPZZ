import prisma from "../../lib/db";

export async function postCompany(name: string, logo: string, location: string) {
    const company = await prisma.company.create({
        data: {
            name: name,
            logo: logo,
            location: location
        }
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

export async function getPositions(id: string) {
    const positions = await prisma.position.findMany({
        where: {
            companyId: Number(id),
        }
    })

    return positions;
}