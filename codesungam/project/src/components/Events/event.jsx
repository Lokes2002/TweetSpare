import React, { useState } from 'react';
import './event.css'; // CSS file for styling

const eventsData = [
    { id: 1, name: "Event 1", date: "2024-11-10" },
    { id: 2, name: "Event 2", date: "2024-11-12" },
    { id: 3, name: "Event 3", date: "2024-11-15" },
    { id: 4, name: "Event 4", date: "2024-11-20" },
    { id: 5, name: "Event 5", date: "2024-11-25" },
];

const upcomingEventsData = [
    { id: 6, name: "Upcoming Event 1", date: "2024-11-30" },
    { id: 7, name: "Upcoming Event 2", date: "2024-12-05" },
    { id: 8, name: "Upcoming Event 3", date: "2024-12-10" },
];

function Event() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % eventsData.length);
    };

    const prevEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + eventsData.length) % eventsData.length);
    };

    return (
        <div className="event-container">
            <h2>Going Events</h2>
            <div className="event-list">
                {eventsData.map((event, index) => (
                    <div className={`event-card ${index === currentIndex ? 'active' : ''}`} key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.date}</p>
                    </div>
                ))}
            </div>
            <div className="event-controls">
                <button onClick={prevEvent}>&lt; Previous</button>
                <button onClick={nextEvent}>Next &gt;</button>
            </div>
            <div className="upcoming-events">
                <h3>Upcoming Events</h3>
                <div className="upcoming-events-list">
                    {upcomingEventsData.map((event) => (
                        <div className="upcoming-event-card" key={event.id}>
                            <h4>{event.name}</h4>
                            <p>{event.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Event;
