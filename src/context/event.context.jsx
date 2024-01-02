import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const EventContext = createContext();

export function useEventContext() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of events from your server
    axios
      .get(`${SERVER_URL}/event`)
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  // CREATE EVENT
  const createEvent = (newEvent, clientId) => {
    axios
      .post(`${SERVER_URL}/event/new-event`, { ...newEvent, clientId })
      .then((response) => {
        setEvents([...events, response.data]);
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  // UPDATE EVENT
  const updateEvent = (eventId, updatedEvent) => {
    axios
      .post(`${SERVER_URL}/event/event-update/${eventId}`, updatedEvent)
      .then((response) => {
        const updatedEvents = events.map((event) => {
          if (event._id === response.data._id) {
            return response.data;
          }
          return event;
        });
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error('Error updating event:', error);
      });
  };

  // DELETE EVENT
  const deleteEvent = (eventId) => {
    axios
      .delete(`${SERVER_URL}/event/delete-event/${eventId}`)
      .then(() => {
        const updatedEvents = events.filter((event) => event._id !== eventId);
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error('Error deleting event:', error);
      });
  };

  return (
    <EventContext.Provider value={{ events, isLoading, createEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}
