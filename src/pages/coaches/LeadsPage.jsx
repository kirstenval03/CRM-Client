import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/lead.context';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const LeadsPage = () => {
    const { leads, fetchLeads, importFromGoogleSheets } = useLeads();
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const totalPage = Math.ceil(leads.length / rowsPerPage);
    const displayLeads = leads.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <div style={{ margin: '10px' }}>
            <Button variant="contained" color="primary" onClick={importFromGoogleSheets}>
                Import from Google Sheets
            </Button>
            <Paper style={{ marginTop: '10px', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Coach Name</TableCell>
                            <TableCell>Coach Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayLeads.map((lead) => (
                            <TableRow key={lead._id}>
                                <TableCell>{lead.name}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.coachName}</TableCell>
                                <TableCell>{lead.coachEmail}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    style={{ padding: '20px' }}
                />
            </Paper>
        </div>
    );
};

export default LeadsPage;
