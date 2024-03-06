import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../services/SERVER_URL';

// Create the context
const TaskContext = createContext();

// Custom hook to use the task context
export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  const { fetchContacts, ...rest } = context;

  return {
    fetchContacts: (eventId) => fetchContacts(eventId),
    ...rest,
  };
};

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch all tasks within a column
  const fetchColumnTasks = async (boardId, columnId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/task/${boardId}/column/${columnId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching column tasks:', error);
      return [];
    }
  };

  // Function to create a new task
  const createTask = async (boardId, columnId, contactIds, indexPosition) => {
    try {
      const response = await axios.post(`${SERVER_URL}/task/${boardId}/column/${columnId}`, { contactIds, indexPosition });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Function to update an existing task
  const updateTask = async (boardId, columnId, taskId, contactIds, indexPosition) => {
    try {
      const response = await axios.put(`${SERVER_URL}/task/${boardId}/column/${columnId}/${taskId}`, { contactIds, indexPosition });
      const updatedTasks = tasks.map((task) => (task._id === taskId ? response.data : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (boardId, columnId, taskId) => {
    try {
      await axios.delete(`${SERVER_URL}/task/${boardId}/column/${columnId}/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

 // Function to fetch all contacts for the current event
const fetchContacts = async (eventId) => {
  try {
    const response = await axios.get(`${SERVER_URL}/contact/${eventId}`);
    const contacts = response.data;

    // Create tasks directly from contacts
    const tasksForContacts = contacts.map((contact) => ({
      ...contact, // Use the contact properties directly as task properties
    }));

    // Set the tasks state with the tasks for contacts
    setTasks(tasksForContacts);

    return contacts; // Return the fetched contacts
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchColumnTasks,
        createTask,
        updateTask,
        deleteTask,
        fetchContacts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
