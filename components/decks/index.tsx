import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import ActionBar from "../actionBar";
import MyTable, { Column } from "../table";
import { useMemo } from "react";
import DeckForm from "./deckForm";
import useSWR from "swr";

const fetcher = (...args:any) => fetch(...args).then((res) => res.json());

export default function Decks() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, error } = useSWR("/api/decks", fetcher);

    const columns = useMemo<Column[]>((): Column[] => {
        return [
            {
                title: "Name",
                field: "name"
            },
            {
                title: "Is Private",
                field: "private"
            },
            {
                title: "Create Date",
                field: "createDate"
            },
            {
                title: "Update Date",
                field: "updateDate"
            }
        ];
    }, []);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Box paddingY={3}>
                <ActionBar
                    title={"Decks"}
                    buttonTitle={"Add new deck"}
                    buttonIcon={<FontAwesomeIcon icon={faListCheck}/>}
                    onClickButton={onOpen}
                />
            </Box>
            <Box paddingY={3}>
                <MyTable
                    columns={columns}
                    rows={data}
                />
            </Box>
            <Drawer isOpen={isOpen} onClose={onClose} size={"lg"}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>
                        Create new deck
                    </DrawerHeader>
                    <DrawerBody>
                        <DeckForm onClose={onClose}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
