import React from 'react';
import './notification.css'; 

const notificationsData = [
    { id: 1, message: "You have a new message from Tarun.", time: "6 min ago" },
    { id: 2, message: "Your event starts in 1 hour.", time: "15 min ago" },
    { id: 3, message: "You have 3 new followers.", time: "30 min ago" },
    { id: 4, message: "Your profile has been updated.", time: "1 hour ago" },
    { id: 5, message: "Reminder: Submit your assignment by tomorrow.", time: "2 hours ago" },
];

function Notification() {
    return (
        <div className="notification-container">
            <h2>Notifications</h2>
            <div className="notification-box">
                {notificationsData.map((notification) => (
                    <div className="notification-card" key={notification.id}>
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-footer">
                            <span className="notification-time">{notification.time}</span>
                            <button className="open-button">Open</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notification;
