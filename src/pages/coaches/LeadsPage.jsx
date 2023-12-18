import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/lead.context';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Select, MenuItem, TableSortLabel } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const LeadsPage = () => {
    const { leads, fetchLeads, importFromGoogleSheets, updateLeadColor } = useLeads();
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
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

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Function to sort array
    const sortArray = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    // Comparator function
    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    // Descending comparator
    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const sortedLeads = sortArray(leads, getComparator(order, orderBy));
    const totalPage = Math.ceil(sortedLeads.length / rowsPerPage);
    const displayLeads = sortedLeads.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const pastelColors = {
        red: '#ff6961',
        green: '#77dd77',
        yellow: '#fdfd96',
    };

    return (
        <div style={{ margin: '10px' }}>
            <Button variant="contained" color="primary" onClick={importFromGoogleSheets}>
                Import from Google Sheets
            </Button>
            <Paper style={{ marginTop: '10px', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                            <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={() => handleSort('email')}
                                >
                                Email
                            </TableSortLabel>
                                </TableCell>
                            <TableCell>
                            <TableSortLabel
                                    active={orderBy === 'coachName'}
                                    direction={orderBy === 'coachName' ? order : 'asc'}
                                    onClick={() => handleSort('coachName')}
                                >
                                Coach Name
                                </TableSortLabel>
                                </TableCell>
                            <TableCell>
                                Coach Email
                                </TableCell>
                            <TableCell>
                                Status Color
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayLeads.map((lead) => (
                            <TableRow 
                                key={lead._id} 
                                style={{ backgroundColor: pastelColors[lead.statusColor] || 'transparent' }}
                            >
                                <TableCell>{lead.name}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.coachName}</TableCell>
                                <TableCell>{lead.coachEmail}</TableCell>
                                <TableCell>
                                    <Select
                                        value={lead.statusColor || ''}
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