import NextAuth, {Account, NextAuthOptions, Profile, User} from "next-auth"
import GithubProvider from "next-auth/providers/github";
import {CredentialInput} from "next-auth/providers";
import {insertUser, isUserExists} from "../../../models/users";
import type {User as MyUser} from "../../../models/users";

const githubClientId = process.env.GITHUB_ID ? process.env.GITHUB_ID : "";
const githubClientSecret = process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : "";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret
        })
    ],
    jwt: {
        secret: process.env.SECRET
    },
    session: {
        strategy: "jwt"
    },
    callbacks:{
        signIn: async (params: {user: User, account: Account, profile: Profile & Record<string, unknown>, email: {verificationRequest?: boolean | undefined}, credentials?: Record<string, CredentialInput> | undefined}): Promise<any> => {
            if(await isUserExists(params.user.email!)){
                return true;
            }

            const item:MyUser = {
                name: params.user.name!,
                email: params.user.email!,
                loginProvider: params.account.provider,
                imageUrl: params.user.image!
            };

            const insertedUser = await insertUser(item);
            return !!insertedUser;
        },
    },
}

export default NextAuth(authOptions)