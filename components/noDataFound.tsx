import { Box, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

type NoDataFoundProps = {
    message: string
}

export default function NoDataFound({ message }: NoDataFoundProps) {
    return (
        <Box>
            <Center paddingY={5}>
                <FontAwesomeIcon icon={faBan} style={{ fontSize: 30 }}/>
            </Center>
            <Center>
                <div>{message}</div>
            </Center>
        </Box>
    );
}

NoDataFound.defaultProps = {
    message: "No data found"
};
