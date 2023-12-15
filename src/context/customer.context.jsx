import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL'; // Adjust the import path as needed

const CustomerContext = createContext();

export function useCustomers() {
    return useContext(CustomerContext);
}

export function CustomerProvider({ children }) {
    const [customers, setCustomers] = useState([]);

    // Fetch all customers
    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/customer`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Import customers from Google Sheets
    const importFromGoogleSheets = async () => {
        try {
            await axios.get(`${SERVER_URL}/customer/import-from-google-sheets`);
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
