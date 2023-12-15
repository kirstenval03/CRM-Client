import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const LeadContext = createContext();

export const useLeads = () => {
    const context = React.useContext(LeadContext);
    if (!context) {
        throw new Error('useLeads must be used within a LeadProvider');
    }
    return context;
}

export const LeadProvider = ({ children }) => {
    const [leads, setLeads] = useState([]);

    // Function to fetch leads from the server
    const fetchLeads = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/leads`);
            setLeads(response.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    // Function to import leads from Google Sheets
    const importFromGoogleSheets = async () => {
        try {
            await axios.get(`${SERVER_URL}/leads/import-from-google-sheets`);
            fetchLeads(); // Refresh leads after import
        } catch (error) {
            console.error('Error importing from Google Sheets:', error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <LeadContext.Provider value={{ leads, fetchLeads, importFromGoogleSheets }}>
            {children}
        </LeadContext.Provider>
    );
};
