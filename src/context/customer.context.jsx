import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CustomerContext = createContext();

export function useCustomers() {
    return useContext(CustomerContext);
}

export function CustomerProvider({ children }) {
    const [customers, setCustomers] = useState([]);

    // Fetch all customers
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/customer'); // Adjust the endpoint as needed
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Import customers from Google Sheets
    const importFromGoogleSheets = async () => {
        try {
            await axios.get('/api/customers/import-from-google-sheets');
            fetchCustomers(); // Optionally refetch customers after import
        } catch (error) {
            console.error('Error importing from Google Sheets:', error);
        }
    };

    // Add more functions (create, update, delete customer) as needed...

    const value = {
        customers,
        fetchCustomers,
        importFromGoogleSheets,
        // ...other functions
    };

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
}

