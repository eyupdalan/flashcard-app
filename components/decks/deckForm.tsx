import { Box, Button, Checkbox, Flex, FormLabel, Input, Stack } from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler, MouseEventHandler, useState } from "react";

type DeckFormProps = {
    selectedDeck?: any | null,
    onClose: MouseEventHandler
}

export default function DeckForm({ onClose }: DeckFormProps) {
    const [deckName, setDeckName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const onChangeDeckName: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => setDeckName(e.target.value);
    const onChangeIsPrivate: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => setIsPrivate(e.target.checked);

    const onClickSave = async () => {
        const data = {
            name: deckName,
            private: isPrivate
        };

        const response = await fetch("/api/decks", { method: "POST", body: JSON.stringify(data) });
    };

    return (
        <Stack spacing={"24px"}>
            <Box>
                <FormLabel htmlFor='deck-name'>Deck Name</FormLabel>
                <Input
                    id='deck-name'
                    placeholder='Please enter deck name'
                    value={deckName}
                    onChange={onChangeDeckName}
                />
            </Box>
            <Box>
                <Checkbox isChecked={isPrivate} onChange={onChangeIsPrivate}>Is Private</Checkbox>
            </Box>
            <Flex justifyContent={"flex-end"}>
                <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme="orange" onClick={onClickSave}>Save</Button>
            </Flex>
        </Stack>
    );
}
