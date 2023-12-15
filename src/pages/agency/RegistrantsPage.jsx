import React, { useEffect } from 'react';
import { useCustomers } from '../../context/customer.context';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';

const CustomersPage = () => {
    const { customers, fetchCustomers, importFromGoogleSheets } = useCustomers();

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div style={{ margin: '20px' }}>
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
                            <TableCell>UTM SOURCE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer._id}>
                                <TableCell>{customer.firstName}</TableCell>
                                <TableCell>{customer.lastName}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.revenue}</TableCell>
                                <TableCell>{customer.date}</TableCell>
                                <TableCell>{customer.utmSource}</TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default CustomersPage;
