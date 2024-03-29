import prisma from "../../lib/db";

export async function sendMessage(sentFrom: number, sentTo: number, content: string) {
    try {
        const userFrom = await prisma.user.update({
            where: {
                id: sentFrom
            },
            data: {
                senderMessages: {
                    create: {
                        recipient: {
                            connect: {
                                id: sentTo
                            }
                        },
                        content: content
                    }
                }
            }
        });

        return { message: "Message successfully sent!" };
    } catch (error) {
        console.log(error);
        return { error: "Problem sending message!" };
    }
}

export async function getConversations(userId: number) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { recipientId: userId }
                ]
            },
            select: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        company: true
                    }
                },
                recipient: {
                    select: {
                        id: true,
                        email: true,
                        company: true
                    }
                }
            }
        });

        const conversationPairs = new Set();

        messages.forEach(message => {
            const otherId = message.recipient.id == userId ? message.sender.id : message.recipient.id;
            const otherEmail = message.recipient.id == userId ? message.sender.email : message.recipient.email;
            const otherCompanyName = message.recipient.id == userId ? message.sender.company?.name : message.recipient.company?.name;
            const otherCompanyLogo = message.recipient.id == userId ? message.sender.company?.logo : message.recipient.company?.logo;
            const pair = [userId, otherId, otherEmail, otherCompanyName, otherCompanyLogo].join(',');
            conversationPairs.add(pair);
        });

        return Array.from(conversationPairs).map((pair: any) => {
            const [userId, otherId, otherEmail, otherCompanyName, otherCompanyLogo] = pair.split(',').map(String);
            return { userId, otherId, otherEmail, otherCompanyName, otherCompanyLogo };
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getConversation(sentFrom: number, sentTo: number) {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        sender: {
                            id: sentFrom
                        },
                        recipient: {
                            id: sentTo
                        }
                    },
                    {
                        sender: {
                            id: sentTo
                        },
                        recipient: {
                            id: sentFrom
                        }
                    }
                ]
            },
            select: {
                sender: {
                    select: {
                        id: true,
                        email: true,
                        company: true
                    }
                },
                recipient: {
                    select: {
                        id: true,
                        email: true,
                        company: true
                    }
                },
                content: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return messages;
    } catch (error) {
        console.log(error);
        return null;
    }
}
