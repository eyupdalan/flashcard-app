import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../db";

export type Deck = {
    id: Number,
    name: string,
    ownerId: Number
    private: Boolean
    createDate: Date
    updateDate?: Date | null
}

const createDeck = async (
    req: NextApiRequest,
    res: NextApiResponse<Deck>
) => {
    try {
        const data = JSON.parse(req.body);
        const session = await getSession({ req });
        const user = await prisma.users.findFirst({ where: { email: session!.user!.email! }});
        data.ownerId = user!.id;
        const deck = await prisma.decks.create({ data });
        return res.status(200).json(deck);
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(error)
        };
    }
};

const getAllDecks = async (
    req: NextApiRequest,
    res: NextApiResponse<Deck[]>
) => {
    try {
        const session = await getSession({ req });
        const user = await prisma.users.findFirst({ where: { email: session!.user!.email! }});
        const decks = await prisma.decks.findMany({ where:{ ownerId: user!.id }});
        return res.status(200).json(decks);
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(error)
        };
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    try {
        const session = await getSession({ req });
        if (!session) {
            return res.status(401).json({ message: `Unauthorized --> ${session}` });
        }

        if (req.method === "POST") {
            return await createDeck(req, res);
        }

        if (req.method === "GET") {
            return await getAllDecks(req, res);
        }

    } catch (e) {
        return res.status(500).json(e);
    }
};
