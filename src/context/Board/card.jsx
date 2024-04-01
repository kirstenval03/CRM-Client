import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../services/SERVER_URL';

// Create a context for managing cards
const CardContext = createContext();

// Custom hook to use the card context
export const useCard = () => useContext(CardContext);

// CardProvider component to manage card-related state and functions
export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  // Function to fetch all cards in a specific column
  const fetchColumnCards = async (columnId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/card/column/${columnId}`);
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching column cards:', error);
    }
  };

  // Function to create a new card
  const createCard = async (contactId, columnId) => {
    try {
      const response = await axios.post(`${SERVER_URL}/card`, { contactId, columnId });
      // Update cards array with the newly created card
      setCards([...cards, response.data]);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  // Function to update an existing card
  const updateCard = async (cardId, { contactId, columnId }) => {
    try {
      const response = await axios.put(`${SERVER_URL}/card/${cardId}`, { contactId, columnId });
      const updatedCards = cards.map((card) => (card._id === cardId ? response.data : card));
      setCards(updatedCards);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  // Function to delete a card
  const deleteCard = async (cardId) => {
    try {
      await axios.delete(`${SERVER_URL}/card/${cardId}`);
      const updatedCards = cards.filter((card) => card._id !== cardId);
      setCards(updatedCards);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Function to create cards for contacts
  const createCardsForContacts = async (eventContacts) => {
    try {
      // Iterate over eventContacts and create a card for each contact
      for (const contact of eventContacts) {
        await createCard(contact._id, contact.columnId); // Assuming contact has columnId
      }
    } catch (error) {
      console.error('Error creating cards for contacts:', error);
    }
  };

  return (
    <CardContext.Provider
      value={{
        cards,
        fetchColumnCards,
        createCard,
        updateCard,
        deleteCard,
        createCardsForContacts,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
