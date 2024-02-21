import React from 'react';

const EventDetails = ({ event }) => {
  return (
    <div>
      <h2>Event Details</h2>
      <p>Client: {event.client.clientName}</p>
      <p>Name: {event.name}</p>
      <p>Initials: {event.initials}</p>
      <p>Edition: {event.edition}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Drive Folder: {event.driveFolder}</p>
      <p>Coaches:</p>
      <ul>
        {event.coaches.map((coach, index) => (
          <li key={index}>{coach.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetails;
