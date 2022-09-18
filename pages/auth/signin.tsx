import styles from "../../styles/SignIn.module.css";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { Button } from "@chakra-ui/react";
import Logo from "../../components/logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ReactElement } from "react";

type ProviderIcons = {
    GitHub: ReactElement,
    Google: ReactElement,
    [prop: string]: ReactElement;
}

const ICONS: ProviderIcons = {
    GitHub: <FontAwesomeIcon icon={faGithub}/>,
    Google: <FontAwesomeIcon icon={faGoogle}/>,
};

export default function SignIn({ providers }: { providers: ClientSafeProvider }) {
    if (!providers) {
        return <div>{JSON.stringify(providers)}</div>;
    }

    const onClickSignInCreator = (providerId: string) => () => signIn(providerId);

    return (
        <div className={styles.signInContainer}>
            <Logo/>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className={styles.providerItem}>
                    <Button
                        size={"lg"}
                        leftIcon={ICONS[provider.name]}
                        onClick={onClickSignInCreator(provider.id)}
                    >
                        Sign in with {provider.name}
                    </Button>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null = await getProviders();
    return {
        props: { providers },
    };
}
