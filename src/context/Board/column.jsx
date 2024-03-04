import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../services/SERVER_URL';


// Create the context
const ColumnContext = createContext();

// Custom hook to use the column context
export const useColumn = () => useContext(ColumnContext);

// ColumnProvider component
export const ColumnProvider = ({ children }) => {
  const [columns, setColumns] = useState([]);

  // Function to fetch all columns within a board
  const fetchBoardColumns = async (boardId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/column/${boardId}`);
      setColumns(response.data);
    } catch (error) {
      console.error('Error fetching board columns:', error);
    }
  };

  // Function to create a new column
  const createColumn = async (boardId, title, indexPosition) => {
    try {
      const response = await axios.post(`${SERVER_URL}/column/${boardId}`, { title, indexPosition });
      setColumns([...columns, response.data]);
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  // Function to update an existing column
  const updateColumn = async (boardId, columnId, title, indexPosition) => {
    try {
      const response = await axios.put(`${SERVER_URL}/column/${boardId}/${columnId}`, { title, indexPosition });
      const updatedColumns = columns.map((col) => (col._id === columnId ? response.data : col));
      setColumns(updatedColumns);
    } catch (error) {
      console.error('Error updating column:', error);
    }
  };

  // Function to delete a column
  const deleteColumn = async (boardId, columnId) => {
    try {
      await axios.delete(`${SERVER_URL}/column/board/${boardId}/${columnId}`);
      const updatedColumns = columns.filter((col) => col._id !== columnId);
      setColumns(updatedColumns);
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  return (
    <ColumnContext.Provider
      value={{
        columns,
        fetchBoardColumns,
        createColumn,
        updateColumn,
        deleteColumn,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};
