import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.title} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
