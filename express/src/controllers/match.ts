import prisma from "../../lib/db";

type PyResponse = {
    match_percentage: number;
};

export async function matchAllJobOffersForUser(userId: number) {
    try {
        const jobOffers = await prisma.jobOffer.findMany({
            include: {
                position: true,
            }
        });

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user?.skills) {
            return null;
        }

        for (const jobOffer of jobOffers) {
            try {
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

                await prisma.match.upsert({
                    where: {
                        jobOfferId_userId: {
                            jobOfferId: jobOffer.id,
                            userId: userId
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
            } catch (e) {
                console.log(e);
                // Handle specific error or continue with the next job offer
            }
        }

        return jobOffers;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMatch(userId: string, jobOfferId: string) {
    try {
        const result = await prisma.match.findUnique({
            where: {
                jobOfferId_userId: {
                    jobOfferId: Number(jobOfferId),
                    userId: Number(userId)
                }
            }
        });

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function calculateMatchesForJob(jobOfferId: string) {
    try {
        const users = await prisma.user.findMany({});

        const jobOffer = await prisma.jobOffer.findUnique({
            where: {
                id: Number(jobOfferId)
            },
            include: {
                position: true,
            }
        });

        for (const user of users) {
            try {
                if (!user.skills) {
                    continue;
                }

                const match_percentage = await fetch('http://py-algorithms:5000/job_match', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "job_description": jobOffer!.position.requirements,
                        "user_data": user?.skills
                    })
                });

                const match_percentage_json = await match_percentage.json() as PyResponse;

                await prisma.match.upsert({
                    where: {
                        jobOfferId_userId: {
                            jobOfferId: Number(jobOfferId),
                            userId: user.id
                        }
                    },
                    update: {
                        score: match_percentage_json.match_percentage
                    },
                    create: {
                        jobOfferId: Number(jobOfferId),
                        userId: user.id,
                        score: match_percentage_json.match_percentage,
                    },
                });
            } catch (e) {
                console.log(e);
                // Handle specific error or continue with the next user
            }
        }

        return jobOffer;
    } catch (error) {
        console.log(error);
        return null;
    }
}
