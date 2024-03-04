import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const ContactContext = createContext();

export function useContacts() {
    return useContext(ContactContext);
}

export function ContactProvider({ children, initialEventId }) {
    const [contacts, setContacts] = useState([]);
    const [eventContacts, setEventContacts] = useState([]); // Store contacts for the current event
    const [boardContacts, setBoardContacts] = useState([]); // Store contacts for the board view

    // Fetch all contacts for the current event
    const fetchContacts = async (eventId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/contact/${eventId}`);
            setEventContacts(response.data);
            console.log('Fetched contacts:', response.data); // Add this line
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    // Fetch contacts specifically for the board view
    const fetchBoardContacts = async (eventId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/contact/board/${eventId}`);
            setBoardContacts(response.data); // Update board contacts state
            console.log('Fetched board contacts:', response.data); // Add this line
        } catch (error) {
            console.error('Error fetching board contacts:', error);
        }
    };

    // Create a new contact for the current event
    const createContact = async (eventId, contactData) => {
        try {
            const response = await axios.post(`${SERVER_URL}/contact/new-contact/${eventId}`, contactData);
            setEventContacts([...eventContacts, response.data]);
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    };

    // Update a contact's information
    const updateContact = async (eventId, contactId, updatedContactData) => {
        try {
            const response = await axios.post(`${SERVER_URL}/contact/contact-update/${eventId}/${contactId}`, updatedContactData);
            const updatedContacts = eventContacts.map((contact) =>
                contact._id === contactId ? response.data : contact
            );
            setEventContacts(updatedContacts);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    // Delete a contact
    const deleteContact = async (contactId) => {
        try {
            await axios.delete(`${SERVER_URL}/contact/delete-contact/${contactId}`);
            const updatedContacts = eventContacts.filter((contact) => contact._id !== contactId);
            setEventContacts(updatedContacts);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    // Initiate the import of contacts for a specific event
    const importContacts = async (eventId) => {
        try {
            await axios.get(`${SERVER_URL}/contact/import-from-google-sheets/${eventId}`);
            console.log('Contact data import initiated');
            // You can handle success or provide feedback to the user here
        } catch (error) {
            console.error('Error importing contact data:', error);
            // Handle the error or provide feedback to the user here
        }
    };

    // Update a contact's status color
    const handleColorChange = async (eventId, contactId, color) => {
        try {
            // Find the contact by ID
            const contact = eventContacts.find(contact => contact._id === contactId);
            if (!contact) {
                console.error('Contact not found');
                return;
            }
            
            // Create updated contact data with the new color
            const updatedContactData = {
                ...contact,
                statusColor: color
            };
    
            // Update the contact with the new color
            await axios.post(`${SERVER_URL}/contact/contact-update/${eventId}/${contactId}`, updatedContactData);
            
            // Update the state with the updated contact data
            const updatedContacts = eventContacts.map(c => c._id === contactId ? updatedContactData : c);
            setEventContacts(updatedContacts);
        } catch (error) {
            console.error('Error updating contact status color:', error);
        }
    };
    
    const value = {
        eventContacts,
        fetchContacts,
        createContact,
        updateContact,
        deleteContact,
        importContacts, // Add the importContacts function
        handleColorChange, // Add the handleColorChange function
        boardContacts, // Include boardContacts in the context value
        fetchBoardContacts, // Include fetchBoardContacts function
    };

    useEffect(() => {
        if (initialEventId) {
            console.log("Fetching contacts for event: ", initialEventId); // Add this line
            Promise.all([fetchContacts(initialEventId), fetchBoardContacts(initialEventId)])
                .then(([contactsRes, boardContactsRes]) => {
                    // Handle the responses if needed
                })
                .catch(error => {
                    console.error('Error fetching contacts:', error);
                });
        }
    }, [initialEventId]);
    

    // Console log for debugging
    console.log("Updated eventContacts: ", eventContacts);
    console.log("Updated boardContacts: ", boardContacts);

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
}
