import React, { useEffect, useState } from 'react';
import { useCustomers } from '../../context/customer.context';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TablePagination  } from '@mui/material';

const CustomersPage = () => {
    const { customers, fetchCustomers, importFromGoogleSheets } = useCustomers();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Debugging: Log the customers array
    useEffect(() => {
        console.log('Fetched Customers:', customers);
    }, [customers]);

    const rowsToDisplay = customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        
        <div style={{ margin: '20px' }}>
            <h1> WTB 2.0 - Registrants</h1>
            <Button variant="contained" color="primary" onClick={importFromGoogleSheets}>
                Import from Google Sheets
            </Button>
            <Paper style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>VIP</TableCell>
                            <TableCell>Ticket Revenue</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>UTM Source</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToDisplay.map((customer) => (
                            <TableRow key={customer._id}>
                                <TableCell>{customer.firstName}</TableCell>
                                <TableCell>{customer.lastName}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.vip ? 'Yes' : 'No'}</TableCell> {/* Convert Boolean to text */}
                                <TableCell>{customer.revenue}</TableCell>
                                <TableCell>{customer.date}</TableCell>
                                <TableCell>{customer.utmSource}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={customers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default CustomersPage;