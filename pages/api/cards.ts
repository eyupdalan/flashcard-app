import type {NextApiRequest, NextApiResponse} from 'next'
import { getSession } from "next-auth/react";
import { prisma } from '../../db';

type Card = {
    id: Number,
    type: Number,
    front: string,
    back: string,
    known: Boolean,
    hint: string | null
}

const createCard = async (
    req: NextApiRequest,
    res: NextApiResponse<Card>
) => {
    try {
        const data = req.body;
        const card = await prisma.cards.create({
            data
        });
        return res.status(200).json(card);
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(error)
        }
    }
}

const getAllCards = async (
    req: NextApiRequest,
    res: NextApiResponse<Card[]>
) => {
    return res.status(200).json([]);
    // try {
    //     await prisma.$connect();
    //     const cards = await prisma.cards.findMany();
    //     await prisma.$disconnect();
    //     return res.status(200).json(cards);
    // } catch (error) {
    //     console.error(error)
    //     return {
    //         statusCode: 500,
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(error)
    //     }
    // }
}

const deleteCard = async (
    req: NextApiRequest,
    res: NextApiResponse<Card>
) => {
    try {
        const {id} = req.query;
        const deletedCard = await prisma.cards.delete({
            where: {
                id: Number(id)
            }
        })
        return res.status(200).json(deletedCard);
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(error)
        }
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const session = await getSession({req})

        if (!session){
            return res.status(401).json({message: `Unauthorized --> ${session}`});
        }

        if (req.method === "POST") {
            return await createCard(req, res);
        }

        if (req.method === "GET") {
            return await getAllCards(req, res);
        }

        if (req.method === "DELETE") {
            return await deleteCard(req, res);
        }

        //Not implemented
        return res.status(501).json({message: `${req.method} is not implemented`});
    } catch (e) {
        return res.status(500).json(e);
    }
}
