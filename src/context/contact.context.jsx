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

    // Fetch all contacts for the current event
    const fetchContacts = async (eventId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/contact/${eventId}`);
            setEventContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
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
    const updateContact = async (contactId, updatedContactData) => {
        try {
            const response = await axios.post(`${SERVER_URL}/contact/contact-update/${contactId}`, updatedContactData);
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

    const value = {
        eventContacts,
        fetchContacts,
        createContact,
        updateContact,
        deleteContact,
    };

    useEffect(() => {
        if (initialEventId) {
          fetchContacts(initialEventId);
        }
      }, [initialEventId]);
      

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
}
