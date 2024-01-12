import React, { useState } from 'react';
import { useEventContext } from '../../context/event.context';
import EventForm from '../../components/EventForm';

function EventsPage() {
  const { events, isLoading, createEvent, updateEvent, deleteEvent } = useEventContext();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSeeDetails = (event) => {
    console.log('Event Details:', event);
  };

  return (
    <div>
      <h1>Active Events</h1>
      <button onClick={() => setIsFormVisible(true)}>Create New Event</button>
      {isFormVisible && (
        <EventForm
          onClose={() => setIsFormVisible(false)}
        />
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No active events found.</p>
      ) : (
        <div className="event-cards">
          {events.map((event) => (
            <div key={event._id} className="event-card square-card"> {/* Add square-card class */}
              <h2>{event.name}</h2>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p> {/* Display formatted date */}
              <p>Client: {event.client.clientName}</p> {/* Display the client name */}
              <button onClick={() => handleSeeDetails(event)}>See Details</button>
              <button onClick={() => handleUpdateClick(event)}>Update</button>
              <button
                onClick={() => {
                  const confirmDelete = window.confirm('Are you sure you want to delete this event?');
                  if (confirmDelete) {
                    deleteEvent(event._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventsPage;
