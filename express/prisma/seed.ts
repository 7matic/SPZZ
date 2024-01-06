import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const amadej = await prisma.user.create({
        data: {
            email: 'amadej.milicev99@gmail.com',
            auth0token: '12'
        }
    });

    const john = await prisma.user.create({
        data: {
            email: 'john.doe@example.com',
            auth0token: '34'
        }
    });

    const apple = await prisma.company.create({
        data: {
            name: 'Apple',
            logo: 'https://cdn.freebiesupply.com/images/thumbs/2x/apple-logo.png',
        }
    });

    const softwareDev = await prisma.position.create({
        data: {
            title: 'Software Developer',
            description: 'Develop software for Apple',
            requirements: 'Seeking a Python developer with experience in web frameworks such as Django or Flask.',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-12-31'),
            companyId: apple.id,
        }
    });

    const jobOffer = await prisma.jobOffer.create({
        data: {
            positionId: softwareDev.id,
            companyId: apple.id,
            location: 'Cupertino, CA',
            salary: 100000,
            active: true
        }
    });

    const dataAnalyst = await prisma.position.create({
        data: {
            title: 'Data Analyst',
            description: 'Analyze data for Apple',
            requirements: 'Seeking a Data Analyst with experience in SQL, Python, and data visualization tools.',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-12-31'),
            companyId: apple.id,
        }
    });

    const jobOfferDataAnalyst = await prisma.jobOffer.create({
        data: {
            positionId: dataAnalyst.id,
            companyId: apple.id,
            location: 'Cupertino, CA',
            salary: 80000,
            active: true
        }
    });

    const frontendDev = await prisma.position.create({
        data: {
            title: 'Frontend Developer',
            description: 'Develop frontend applications for Apple',
            requirements: 'Seeking a Frontend Developer with experience in React, JavaScript, and CSS.',
            startDate: new Date('2022-01-01'),
            endDate: new Date('2022-12-31'),
            companyId: apple.id,
        }
    });

    await prisma.company.update({
        where: { id: apple.id },
        data: {
            positions: {
                connect: [{id: softwareDev.id}, {id: dataAnalyst.id}, {id: frontendDev.id}]
            }
        },
    });

    await prisma.position.update({
        where: { id: softwareDev.id },
        data: {
            jobOffer: {
                connect: {
                    id: jobOffer.id
                }
            }
        },
    });

    await prisma.position.update({
        where: { id: dataAnalyst.id },
        data: {
            jobOffer: {
                connect: {
                    id: jobOfferDataAnalyst.id
                }
            }
        },
    });

    await prisma.user.update({
        where: { id: john.id },
        data: {
            appliedTo: {
                connect: {
                    id: jobOffer.id
                }
            },
        },
    });

    await prisma.user.update({
        where: { id: amadej.id },
        data: {
            appliedTo: {
                connect: {
                    id: jobOffer.id
                }
            },
        },
    });
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })