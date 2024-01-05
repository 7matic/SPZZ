import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const amadej = await prisma.user.create({
        data: {
            email: 'amadej.milicev99@gmail.com',
            auth0token: '12'
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
            minSalary: 100000,
            maxSalary: 150000,
            active: true
        }
    });

    await prisma.company.update({
        where: { id: apple.id },
        data: {
            positions: {
                connect: {
                    id: softwareDev.id
                }
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