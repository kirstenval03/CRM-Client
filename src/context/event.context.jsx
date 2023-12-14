
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const EventContext = createContext()

const EventProvider = ({ children }) => {

    const [events, setEvents] = useState([])

    const getEvents = () => {

        get('/events')
            .then((response) => {
                console.log("Events", response.data)
                setEvents(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <EventContext.Provider value={{ events, getEvents, setEvents}}>
            {children}
        </EventContext.Provider>
    )
}

export { EventContext, EventProvider }
