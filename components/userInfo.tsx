import { useSession, signOut } from "next-auth/react";
import { Avatar, Button, Center, Container, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";

export default function UserInfo() {
    const { data: session } = useSession();

    const onClickSignOut = async () => {
        await signOut({ callbackUrl:"/" });
    };

    return (
        <div>
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
                    <Button size={"sm"} onClick={onClickSignOut}>Sign Out</Button>
                </Center>
            </Flex>
            <Divider/>
        </div>
    );
}
