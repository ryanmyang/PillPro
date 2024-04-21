import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
    Box,
    Collapse,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import data from "../data.json";
import ItemCard from "./ItemCard";

function MedicationRow({ row, idx }) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th">
                    <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            <Tooltip title="Toggle side effects">
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </Tooltip>
                        </IconButton>
                        {idx + 1}
                    </Grid>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.dosage}</TableCell>
                <TableCell align="right">{row.frequency}</TableCell>
                <TableCell align="right">{row.verification_status}</TableCell>
            </TableRow>
            {open && (
                <TableRow>
                    <TableCell colSpan={5}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Typography>
                                Side effects include Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Itaque esse nesciunt dignissimos hic maxime
                                reiciendis recusandae perspiciatis vero labore beatae, dolores
                                dolor, non laudantium in quaerat, voluptates ad incidunt rerum!
                            </Typography>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}

function MedicationInfo() {
    // TODO
    // const [data, setData] = useState([]);

    return (
        <ItemCard>
            <Typography variant="h2" sx={{ pb: "1rem" }}>
                Your prescription summary
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Medication</TableCell>
                            <TableCell align="right">Dosage</TableCell>
                            <TableCell align="right">Frequency</TableCell>
                            <TableCell align="right">Verified</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, idx) => (
                            <MedicationRow row={row} idx={idx} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ItemCard>
    );
}

export default MedicationInfo;
