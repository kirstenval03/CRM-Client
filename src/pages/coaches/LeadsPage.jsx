import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/lead.context';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const LeadsPage = () => {
    const { leads, fetchLeads, importFromGoogleSheets, updateLeadColor } = useLeads();
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleColorChange = (leadId, color) => {
        updateLeadColor(leadId, color);
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
                            <TableCell>Status Color</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {displayLeads.map((lead) => (
    <TableRow 
        key={lead._id} 
        style={{ backgroundColor: lead.statusColor || 'transparent' }} // Default to transparent if undefined
    >
        <TableCell>{lead.name}</TableCell>
        <TableCell>{lead.email}</TableCell>
        <TableCell>{lead.coachName}</TableCell>
        <TableCell>{lead.coachEmail}</TableCell>
        <TableCell>
            <Select
                value={lead.statusColor || ''} // Default to empty string if undefined
                onChange={(e) => handleColorChange(lead._id, e.target.value)}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="yellow">Yellow</MenuItem>
                                    <MenuItem value="green">Green</MenuItem>
                                    <MenuItem value="red">Red</MenuItem>
                                </Select>
                            </TableCell>
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
