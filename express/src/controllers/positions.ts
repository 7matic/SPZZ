import { Position } from "@prisma/client";
import prisma from "../../lib/db";

export async function getPosition(id: string) {
    const positions = await prisma.position.findMany({
        where: {
            id: Number(id)
        }
    });

    return positions;
}

export async function createPosition( Position : Position ){
    const position = await prisma.position.create({
        data: Position
    });

    return position;
}

export async function deletePosition(id: string) {
    const position = await prisma.position.delete({
        where: {
            id: Number(id)
        }
    });
    
    return position;
}

export async function updatePosition( Position : Position ){
    const position = await prisma.position.update({
        where: {
            id: Position.id
        },
        data: Position
    });

    return position;
}