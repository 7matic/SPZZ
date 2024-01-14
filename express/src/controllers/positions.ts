import { Position } from "@prisma/client";
import prisma from "../../lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function getPosition(id: string) {
    const positions = await prisma.position.findMany({
        where: {
            id: Number(id)
        }
    });

    return positions;
}

export async function createPosition(Position: Position, companyId: number) {
    let position;
    try {
        position = await prisma.position.create({
            data: {
                description: Position.description,
                requirements: Position.requirements,
                title: Position.title,
                company: {
                    connect: {
                        id: companyId
                    }
                }
            }
        });
    } catch (e) {
        return null;
    }

    return position;
}

export async function deletePosition(id: string, companyId: number) {
    let position;

    try {
        position = await prisma.position.delete({
            where: {
                id: Number(id),
                companyId: companyId
            }
        });
    } catch (e) {
        console.log(e);
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
            return null;
        }
    }

    return position;
}

export async function updatePosition(Position: Position, companyId: number) {
    let position;
    try {
        position = await prisma.position.update({
            where: {
                id: Position.id,
                companyId: companyId
            },
            data: Position
        });
    } catch (e) {
        console.log(e);
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
            return null;
        }
    }

    return position;
}