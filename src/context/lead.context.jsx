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

    const fetchLeads = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/leads`);
            setLeads(response.data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    const importFromGoogleSheets = async () => {
        try {
            await axios.get(`${SERVER_URL}/leads/import-from-google-sheets`);
            fetchLeads(); // Refresh leads after import
        } catch (error) {
            console.error('Error importing from Google Sheets:', error);
        }
    };

    const updateLeadColor = async (leadId, statusColor) => {
        try {
            console.log("Updating color for lead:", leadId, "to", statusColor);
            await axios.patch(`${SERVER_URL}/leads/${leadId}/update-color`, { statusColor }); // Update this line
            fetchLeads(); // Refresh leads after update
        } catch (error) {
            console.error('Error updating lead color:', error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <LeadContext.Provider value={{ leads, fetchLeads, importFromGoogleSheets, updateLeadColor }}>
            {children}
        </LeadContext.Provider>
    );
};
