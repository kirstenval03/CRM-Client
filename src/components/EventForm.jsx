import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/event.context';

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
    active: true,
    coaches: [],
    clientId: '', // Add clientId to associate the event with a client
  });
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    // Fetch the list of clients from your server and populate the dropdown
    // Make an axios request to get the list of clients and set it in the 'clients' state.
    // Example:
    // axios.get(`${SERVER_URL}/clients`)
    //   .then((response) => {
    //     setClients(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching clients:', error);
    //   });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure a client is selected before creating the event
    if (!selectedClient) {
      alert('Please select a client.');
      return;
    }
    // Associate the selected client's ID with the event
    newEvent.clientId = selectedClient;
    // Send a POST request to create the event
    createEvent(newEvent);
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
        <label>
          Client:
          <select
            name="clientId"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            required
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
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
