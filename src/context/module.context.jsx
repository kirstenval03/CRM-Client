import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const ModuleContext = createContext();

export function useModuleContext() {
  return useContext(ModuleContext);
}

export function ModuleProvider({ children }) {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of modules from your server
    axios
      .get(`${SERVER_URL}/modules`) // Replace with your API endpoint for modules
      .then((response) => {
        setModules(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });
  }, []);

  // CREATE MODULE
  const createModule = async (newModule) => {
    try {
      const response = await axios.post(`${SERVER_URL}/modules/new-module`, newModule);
      setModules((prevModules) => [...prevModules, response.data]);
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  // UPDATE MODULE
  const updateModule = async (moduleId, updatedModule) => {
    try {
      const response = await axios.put(`${SERVER_URL}/modules/${moduleId}`, updatedModule);
      const updatedModules = modules.map((module) =>
        module._id === response.data._id ? response.data : module
      );
      setModules(updatedModules);
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  // DELETE MODULE
  const deleteModule = async (moduleId) => {
    try {
      await axios.delete(`${SERVER_URL}/modules/${moduleId}`);
      const updatedModules = modules.filter((module) => module._id !== moduleId);
      setModules(updatedModules);
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  return (
    <ModuleContext.Provider value={{ modules, isLoading, createModule, updateModule, deleteModule }}>
      {children}
    </ModuleContext.Provider>
  );
}
