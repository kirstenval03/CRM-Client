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

  // Function to fetch the user's board from the backend
  const fetchUserBoard = async (userId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/board/user/${userId}`);
      setBoard(response.data);
    } catch (error) {
      console.error('Error fetching user board:', error);
    }
  };

  // Function to create a new board
  const createBoard = async (userId, columns) => {
    try {
      const response = await axios.post(`${SERVER_URL}/board`, { userId, columns });
      setBoard(response.data);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  // Function to update an existing board
  const updateBoard = async (boardId, columns) => {
    try {
      const response = await axios.put(`${SERVER_URL}/board/board-update/${boardId}`, { columns });
      setBoard(response.data);
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        fetchUserBoard,
        createBoard,
        updateBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
