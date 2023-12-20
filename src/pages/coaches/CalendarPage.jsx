import React, { useState, useEffect } from 'react';
import { useEvents } from '../../context/event.context';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventForm from '../../components/AddEvent'; 

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const { events, fetchEvents } = useEvents();
    const [showAddEventModal, setShowAddEventModal] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAddEventClick = () => {
        setShowAddEventModal(true);
    };

    return (
        <div style={{ height: 700 }}>
            <button onClick={handleAddEventClick}>Add Event</button>
            <Calendar
                localizer={localizer}
                events={events.map(event => ({
                    ...event,
                    start: new Date(event.startDate),
                    end: new Date(event.endDate),
                    title: event.name
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
            {showAddEventModal && <AddEventForm closeModal={() => setShowAddEventModal(false)} />}
        </div>
    );
};

export default CalendarPage;
