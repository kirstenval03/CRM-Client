// client.context.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const ClientContext = createContext();

export function useClientContext() {
  return useContext(ClientContext);
}

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of clients from your server
    axios
      .get(`${SERVER_URL}/client`)
      .then((response) => {
        setClients(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  //NEW CLIENT
  const addClient = (newClient) => {
    axios
      .post(`${SERVER_URL}/client/new-client`, newClient)
      .then((response) => {
        setClients([...clients, response.data]);
      })
      .catch((error) => {
        console.error('Error adding client:', error);
      });
  };

//   UPDATE CLIENT
  const updateClient = (clientId, updatedClient) => {
    axios
      .post(`${SERVER_URL}/client/client-update/${clientId}`, updatedClient)
      .then((response) => {
        const updatedClients = clients.map((client) => {
          if (client._id === response.data._id) {
            return response.data;
          }
          return client;
        });
        setClients(updatedClients);
      })
      .catch((error) => {
        console.error('Error updating client:', error);
      });
  };


//   DELETE CLIENT
  const deleteClient = (clientId) => {
    axios
      .delete(`${SERVER_URL}/client/delete-client/${clientId}`)
      .then(() => {
        const updatedClients = clients.filter((client) => client._id !== clientId);
        setClients(updatedClients);
      })
      .catch((error) => {
        console.error('Error deleting client:', error);
      });
  };

  return (
    <ClientContext.Provider value={{ clients, isLoading, addClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
}
