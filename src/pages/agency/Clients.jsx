import React, { useEffect, useState } from 'react';
import { useClientContext } from '../../context/client.context';

const modalFormStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  zIndex: '1000',
};

function Clients() {
  const { clients, isLoading, addClient, updateClient, deleteClient } = useClientContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', driveFolder: '' });
  const [selectedClient, setSelectedClient] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = () => {
    // Send a POST request to create a new client
    addClient(newClient);
    // Clear the form inputs and hide the form
    setNewClient({ name: '', driveFolder: '' });
    setIsFormVisible(false);
  };

  const handleUpdateClick = (client) => {
    // Display the update form for the selected client
    setSelectedClient(client);
    setNewClient({ name: client.name, driveFolder: client.driveFolder });
    setIsFormVisible(true);
  };

  const handleUpdateClient = () => {
    // Send a PUT request to update the selected client
    updateClient(selectedClient._id, newClient);
    // Clear the form inputs and hide the form
    setNewClient({ name: '', driveFolder: '' });
    setIsFormVisible(false);
    setSelectedClient(null);
  };

  const handleCloseForm = () => {
    // Clear the form inputs and hide the form
    setNewClient({ name: '', driveFolder: '' });
    setIsFormVisible(false);
    setSelectedClient(null);
  };

  return (
    <div>
      <h1>Clients</h1>
      <button onClick={() => setIsFormVisible(true)}>Add New Client</button>
      {isFormVisible && (
        <div style={modalFormStyle}>
          <button onClick={handleCloseForm}>Close</button>
          <h2>{selectedClient ? 'Update Client' : 'Add New Client'}</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Drive Folder:
              <input
                type="text"
                name="driveFolder"
                value={newClient.driveFolder}
                onChange={handleInputChange}
              />
            </label>
            <br />
            {selectedClient ? (
              <button type="button" onClick={handleUpdateClient}>
                Update Client
              </button>
            ) : (
              <button type="button" onClick={handleAddClient}>
                Create Client
              </button>
            )}
          </form>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Drive Folder</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>
                  {/* Display the Drive Folder as a clickable link */}
                  <a
                    href={client.driveFolder}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {client.driveFolder}
                  </a>
                </td>
                <td>
                  {/* Add buttons for client actions (update, delete) */}
                  <button onClick={() => handleUpdateClick(client)}>
                    Update
                  </button>
                  <button onClick={() => {
                    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
                    if (confirmDelete) {
                      deleteClient(client._id);
                    }
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Clients;
