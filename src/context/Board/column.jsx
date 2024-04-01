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
  const fetchEventColumns = async (eventId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/column/${eventId}`);
      setColumns(response.data);
    } catch (error) {
      console.error('Error fetching event columns:', error);
    }
  };

  // Function to create a new column
  const createColumn = async (eventId, title, indexPosition) => {
    try {
      const response = await axios.post(`${SERVER_URL}/column/event/${eventId}`, { title });
      setColumns([...columns, response.data]);
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  // Function to update an existing column
  const updateColumn = async (eventId, columnId, title, indexPosition) => {
    try {
      const response = await axios.put(`${SERVER_URL}/column/event/${eventId}/${columnId}`, { title });
      const updatedColumns = columns.map((col) => (col._id === columnId ? response.data : col));
      setColumns(updatedColumns);
    } catch (error) {
      console.error('Error updating column:', error);
    }
  };

  // Function to delete a column
  const deleteColumn = async (eventId, columnId) => {
    try {
      await axios.delete(`${SERVER_URL}/column/event/${eventId}/${columnId}`);
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
        fetchEventColumns,
        createColumn,
        updateColumn,
        deleteColumn,
      }}
    >
      {children}
    </ColumnContext.Provider>
  );
};

export default ColumnProvider;
