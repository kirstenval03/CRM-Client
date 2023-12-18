import React, { useEffect } from 'react';
import { useEvents } from '../../context/event.context';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
    const { events, fetchEvents } = useEvents();

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div style={{ height: 700 }}>
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
        </div>
    );
};

export default CalendarPage;
