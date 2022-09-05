import type {NextApiRequest, NextApiResponse} from 'next'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

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
        console.log(data);
        const card = await prisma.card.create({
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
    try {
        const cards = await prisma.card.findMany();
        return res.status(200).json(cards);
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(error)
        }
    }
}

const deleteCard = async (
    req: NextApiRequest,
    res: NextApiResponse<Card>
) => {
    try {
        const {id} = req.query;
        const deletedCard = await prisma.card.delete({
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
