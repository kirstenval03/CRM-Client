import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/lead.context';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Select, MenuItem, TableSortLabel, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import LeadCard from '../../components/LeadCard'; 

const LeadsPage = () => {
    const { leads, fetchLeads, importFromGoogleSheets, updateLeadColor } = useLeads();
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [colorFilter, setColorFilter] = useState(''); 
    const rowsPerPage = 10;
    const [viewMode, setViewMode] = useState('table'); 

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

    const handleColorFilterChange = (event) => {
        setColorFilter(event.target.value);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === 'table' ? 'cards' : 'table');
    };

    // Function to filter leads by color
    const filteredLeads = leads.filter(lead => colorFilter === '' || lead.statusColor === colorFilter);

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

    const sortedAndFilteredLeads = sortArray(filteredLeads, getComparator(order, orderBy));
    const totalPage = Math.ceil(sortedAndFilteredLeads.length / rowsPerPage);
    const displayLeads = sortedAndFilteredLeads.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const pastelColors = {
        red: '#ff6961',
        green: '#77dd77',
        yellow: '#fdfd96',
    };

    return (
        <div style={{ margin: '10px' }}>
            <Button onClick={toggleViewMode}>
                Switch to {viewMode === 'table' ? 'Cards' : 'Table'} View
            </Button>
            <Button variant="contained" color="primary" onClick={importFromGoogleSheets}>
                Import from Google Sheets
            </Button>
            <Select
                value={colorFilter}
                onChange={handleColorFilterChange}
                style={{ marginLeft: '10px' }}
            >
                <MenuItem value="">All Colors</MenuItem>
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="red">Red</MenuItem>
                
            </Select>

           
            <Paper style={{ marginTop: '10px', overflowX: 'auto' }}>
            {viewMode === 'table' ? (
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
                ) : (
                <Grid container>
                    {displayLeads.map(lead => (
                        <Grid item key={lead._id} xs={12} sm={6} md={4}>
                            <LeadCard lead={lead} />
                        </Grid>
                    ))}
                </Grid>
            )}

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