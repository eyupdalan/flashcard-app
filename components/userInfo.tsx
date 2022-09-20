import { useSession, signOut } from "next-auth/react";
import { Avatar, Button, Center, Container, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UserInfo() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(()=>{
        if(!session){
            router.push("/");
        }
    },[router, session]);

    const onClickSignOut = async () => {
        await signOut();
    };

    return (
        <Container maxW={"container.lg"}>
            <Flex>
                <Flex>
                    <Center>
                        <Avatar name={session?.user?.name!} src={session?.user?.image!}/>
                    </Center>
                    <Center p={4}>
                        <Heading size={"md"}>{session?.user?.name!}</Heading>
                    </Center>
                </Flex>
                <Spacer />
                <Center>
                    <Button onClick={onClickSignOut}>Sign Out</Button>
                </Center>
            </Flex>
            <Divider/>
            {JSON.stringify(session)}
        </Container>
    );
}
