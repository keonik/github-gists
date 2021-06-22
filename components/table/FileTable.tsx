import {
    Link,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import React, { Props, ReactElement } from 'react';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

interface Props {
    files:
        | {
              filename: string;
              type: string;
              language: string;
              raw_url: string;
              size: number;
          }[]
        | undefined;
}

export default function FileTable({ files = [] }: Props): ReactElement {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Filename</TableCell>
                        <TableCell align="right">Language</TableCell>
                        <TableCell align="right">Raw File</TableCell>
                        <TableCell align="right">Size</TableCell>
                        <TableCell align="right">Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map(({ filename, language, raw_url, size, type }) => (
                        <TableRow key={filename}>
                            <TableCell component="th" scope="row">
                                {filename}
                            </TableCell>
                            <TableCell align="right">{language}</TableCell>
                            <TableCell align="right">
                                <Link href={raw_url}>Link</Link>
                            </TableCell>
                            <TableCell align="right">{size}</TableCell>
                            <TableCell align="right">{type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
