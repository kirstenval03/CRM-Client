import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/event.context';
import axios from 'axios'; // Import axios
import { SERVER_URL } from '../services/SERVER_URL'; // Import SERVER_URL

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
  zIndex: '1000',
};

function EventForm({ onClose }) {
  const { createEvent } = useEventContext();
  const [newEvent, setNewEvent] = useState({
    name: '',
    initials: '',
    edition: 1,
    date: '',
    driveFolder: '',
    spreadsheetID: '',
    active: true,
    coaches: [],
    clientId: '', // Add clientId to associate the event with a client
  });
  const [clients, setClients] = useState([]);
  const [selectedClientName, setSelectedClientName] = useState(''); // Store the selected client's name

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/client`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure a client is selected before creating the event
    if (!selectedClientName) {
      alert('Please select a client.');
      return;
    }
    // Find the client with the matching name
    const matchingClient = clients.find((client) => client.name === selectedClientName);
  
    if (!matchingClient) {
      alert('Selected client not found.');
      return;
    }
  
    // Extract the client's ID
    const clientId = matchingClient._id;
  
    // Create a new object with event details
    const eventDetails = {
      name: newEvent.name,
      initials: newEvent.initials,
      edition: newEvent.edition,
      date: newEvent.date,
      driveFolder: newEvent.driveFolder,
      spreadsheetID: newEvent.spreadsheetID,
      active: newEvent.active,
      coaches: newEvent.coaches,
    };
  
    // Send a POST request to create the event
    createEvent(eventDetails, clientId);
    // Close the form
    onClose();
  };

  return (
    <div style={modalStyle}>
      <button onClick={onClose}>Close</button>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Event Initials:
          <input
            type="text"
            name="initials"
            value={newEvent.initials}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Event Date:
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Drive Folder:
          <input
            type="text"
            name="driveFolder"
            value={newEvent.driveFolder}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Spreadsheet ID:
          <input
            type="text"
            name="spreadsheetID"
            value={newEvent.spreadsheetID}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Active:
          <select
            name="active"
            value={newEvent.active}
            onChange={handleInputChange}
            required
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Client:
          <select
            name="clientId"
            value={selectedClientName}
            onChange={(e) => setSelectedClientName(e.target.value)}
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventForm;

