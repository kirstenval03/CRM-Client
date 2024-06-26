import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../services/SERVER_URL';

// Create the context
const BoardContext = createContext();

// Create a custom hook to use the context
export const useBoard = () => useContext(BoardContext);

// Create the BoardProvider component
export const BoardProvider = ({ children }) => {
  // State to hold the current user's board
  const [board, setBoard] = useState(null);

  // Function to fetch the event board from the backend
  const fetchEventBoard = async (eventId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/board/event/${eventId}`);
      setBoard(response.data);
    } catch (error) {
      console.error('Error fetching event board:', error);
    }
  };

  // Function to create a new board
  const createBoard = async (eventId, columnsData) => {
    try {
      // Prepare columnsData with contacts
      const columns = columnsData.map(column => {
        const cards = column.contacts.map(contactId => ({ contactId }));
        return { title: column.title, cards };
      });

      const response = await axios.post(`${SERVER_URL}/board`, { eventId, columns });
      setBoard(response.data);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  // Function to update an existing board
  const updateBoard = async (boardId, columnsData) => {
    try {
      // Prepare columnsData with contacts
      const updatedColumns = columnsData.map(column => {
        const cards = column.contacts.map(contactId => ({ contactId }));
        return { title: column.title, cards };
      });

      const response = await axios.put(`${SERVER_URL}/board/board-update/${boardId}`, { columns: updatedColumns });
      setBoard(response.data);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        fetchEventBoard,
        createBoard,
        updateBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;