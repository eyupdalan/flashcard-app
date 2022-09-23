import { Container } from "@chakra-ui/react";
import UserInfo from "../../components/userInfo";
import Decks from "../../components/decks";

export default function User() {
    return (
        <Container maxW={"container.lg"}>
            <UserInfo/>
            <Decks/>
        </Container>
    );
}
