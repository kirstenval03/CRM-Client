import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL'; // Adjust the import path as needed

const ContactContext = createContext();

export function useContacts() {
    return useContext(ContactContext);
}

export function ContactProvider({ children }) {
    const [contacts, setContacts] = useState([]);

    // Fetch all contacts
    const fetchContacts = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/contact`);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    // Add more functions (create, update, delete contact) as needed...

    const value = {
        contacts,
        fetchContacts,
        // ...other functions
    };

    useEffect(() => {
        fetchContacts(); // Fetch contacts when the component mounts
    }, []);

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
}
