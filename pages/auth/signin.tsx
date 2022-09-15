import type {ClientSafeProvider, LiteralUnion} from "next-auth/react"
import {getProviders, signIn} from "next-auth/react"
import {BuiltInProviderType} from "next-auth/providers";

export default function SignIn({providers}:{providers: ClientSafeProvider}) {
    if (!providers) {
        return <div>{JSON.stringify(providers)}</div>;
    }
    return (
        <>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps() {
    const providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null = await getProviders();
    return {
        props: {providers},
    }
}