import prisma from "../../lib/db";

export async function sendMessage(sentFrom: number, sentTo: number, content: string){
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

    return userFrom;
}

export async function getConversations(userId: number){
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
                }
            },
            recipient: {
                select: {
                    id: true,
                    email: true,
                }
            }
        }
    });

    const conversationPairs = new Set();

    messages.forEach(message => {
        const otherId = message.recipient.id == userId ? message.sender.id : message.recipient.id;
        const otherEmail = message.recipient.id == userId ? message.sender.email : message.recipient.email;
        const pair = [userId, otherId, otherEmail].join(',');
        conversationPairs.add(pair);
    });

    return Array.from(conversationPairs).map((pair: any) => {
        const [userId, otherId, otherEmail] = pair.split(',').map(String);
        return { userId, otherId, otherEmail };
    });
}

export async function getConversation(sentFrom: number, sentTo: number){
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
        }
    });

    return messages;
}