import { Container } from "@chakra-ui/react";
import UserInfo from "../../components/userInfo";

export default function User(){
    return (
        <Container maxW={"container.lg"}>
            <UserInfo />
        </Container>
    );
}
