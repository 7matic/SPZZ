import prisma from "../../lib/db";

type PyResponse = {
    match_percentage: number;
};

export async function   matchAllJobOffersForUser(userId: string){
    const jobOffers = await prisma.jobOffer.findMany({
        include:{
            position: true,
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
    });

    jobOffers.forEach(async (jobOffer) => {
        const match_percentage = await fetch('http://py-algorithms:5000/job_match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "job_description": jobOffer.position.requirements,
                "user_data": user?.skills
            })
        });

        const match_percentage_json = await match_percentage.json() as PyResponse;

        const match = await prisma.match.upsert({
            where: {
                jobOfferId_userId: {
                    jobOfferId: jobOffer.id,
                    userId: Number(userId)
                }
            },
            update: {
                score: match_percentage_json.match_percentage
            },
            create: {
                jobOfferId: jobOffer.id,
                userId: Number(userId),
                score: match_percentage_json.match_percentage,
            },
        });
    });

    return jobOffers;
}

export async function getMatch(userId: string, jobOfferId: string){
    const result = await prisma.match.findUnique({
        where: {
            jobOfferId_userId: {
                jobOfferId: Number(jobOfferId),
                userId: Number(userId)
            }
        }
    });

    return result;
}