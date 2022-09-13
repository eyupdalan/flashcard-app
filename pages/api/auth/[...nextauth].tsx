import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";

const githubClientId = process.env.GITHUB_ID ? process.env.GITHUB_ID : "";
const githubClientSecret = process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : "";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: githubClientId,
            clientSecret: githubClientSecret,
        })
    ],
}

export default NextAuth(authOptions)