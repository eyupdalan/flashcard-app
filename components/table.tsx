import { Table as CTable, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useMemo } from "react";
import NoDataFound from "./noDataFound";

export type Column = {
    field: string,
    title: string,
    isNumeric?: boolean
}

export type TableProps = {
    columns: Column[],
    rows: any[]
}

export default function Table({ columns, rows }: TableProps) {
    const renderedHead = useMemo(() => {
        const head = columns.map((col, index) => (
            <Th
                key={`header-${col.field}-${index}`}
                isNumeric={col.isNumeric}>
                {col.title}
            </Th>
        ));
        return (
            <Thead>
                <Tr>
                    {head}
                </Tr>
            </Thead>
        );
    }, [columns]);

    const renderNoDataFound = useMemo(() => {
        if (rows && rows.length <= 0) {
            return (
                <TableCaption>
                    <NoDataFound/>
                </TableCaption>
            );
        }

        return null;
    }, [rows]);

    const renderedRows = useMemo(() => {
        if (rows.length <= 0) {
            return null;
        }

        return rows.map((row, idx) => {
            const colList = columns.map((col, index) => {
                return <Td key={`${row[col.field]}-${index}`}>{row[col.field]?row[col.field].toString():""}</Td>;
            });

            return <Tr key={`row-${idx}`}>{colList}</Tr>;
        });

    }, [columns, rows]);

    return (
        <TableContainer style={{ border: "1px solid #edf1f7", padding: 5 }}>
            <CTable size={"sm"}>
                {renderedHead}
                {renderNoDataFound}
                <Tbody>
                    {renderedRows}
                </Tbody>
            </CTable>
        </TableContainer>
    );
}

Table.defaultProps = {
    columns: [],
    rows: []
};
