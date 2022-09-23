import { Box, Button, Center, Flex, Heading, Spacer } from "@chakra-ui/react";
import { MouseEventHandler, ReactElement } from "react";

export interface ActionBarProps {
    title: string,
    buttonTitle: string,
    buttonIcon?: ReactElement,
    onClickButton: MouseEventHandler
}

export default function ActionBar({ title, buttonTitle, buttonIcon, onClickButton }: ActionBarProps) {
    return (
        <Flex>
            <Center>
                <Heading size={"sm"}>{title}</Heading>
            </Center>
            <Spacer/>
            <Center>
                <Button size={"sm"} onClick={onClickButton}>
                    {buttonIcon ? buttonIcon : null}
                    <Box paddingX={2}>
                        {buttonTitle}
                    </Box>
                </Button>
            </Center>
        </Flex>
    );
}
