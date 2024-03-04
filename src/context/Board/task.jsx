import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../services/SERVER_URL';

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../services/SERVER_URL';

// Create the context
const TaskContext = createContext();

// Custom hook to use the task context
export const useTask = () => useContext(TaskContext);

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch all tasks within a column
  const fetchColumnTasks = async (boardId, columnId) => {
    try {
      const response = await axios.get(`${SERVER_URL}/task/${boardId}/column/${columnId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching column tasks:', error);
    }
  };

  // Function to create a new task
  const createTask = async (boardId, columnId, contactId, indexPosition) => {
    try {
      const response = await axios.post(`${SERVER_URL}/task/${boardId}/column/${columnId}`, { contactId, indexPosition });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Function to update an existing task
  const updateTask = async (boardId, columnId, taskId, contactId, indexPosition) => {
    try {
      const response = await axios.put(`${SERVER_URL}/task/${boardId}/column/${columnId}/${taskId}`, { contactId, indexPosition });
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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchColumnTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
