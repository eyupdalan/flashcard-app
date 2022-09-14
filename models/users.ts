import {prisma} from '../db';

export type User = {
    id?: Number,
    name: string,
    email: string,
    loginProvider: string,
    imageUrl: string | null,
    createDate?: Date,
    updateDate?: Date | null
}

export const insertUser = async (user: User): Promise<User> => {
    return await prisma.users.create({
        data: {
            name: user.name,
            email: user.email,
            loginProvider: user.loginProvider,
            imageUrl: user.imageUrl
        }
    })
}

export const isUserExists = async (email: string): Promise<boolean> => {
    const user = await prisma.users.findFirst({where: {email}});
    return !!user;
}