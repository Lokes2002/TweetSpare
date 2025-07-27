import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './attandace.css'; // CSS file for styling

function Attendance() {
    const [value, setValue] = useState(new Date());
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/attendance'); // Your API endpoint
                setAttendance(response.data);
            } catch (error) {
                console.error("Error fetching attendance data", error);
            }
        };
        fetchAttendance();
    }, []);

    const markAttendance = async (date) => {
        try {
            await axios.post('http://localhost:5000/api/attendance', { date });
            alert('Attendance marked for ' + date.toDateString());
            // Refresh attendance data after marking
            const response = await axios.get('http://localhost:5000/api/attendance');
            setAttendance(response.data);
        } catch (error) {
            console.error("Error marking attendance", error);
        }
    };

    return (
        <div className="attendance-container">
            <h2>Attendance Page</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={setValue}
                    value={value}
                />
                <button onClick={() => markAttendance(value)}>
                    Mark Attendance
                </button>
            </div>
            <div className="attendance-details">
                <h3>Your Attendance Records</h3>
                <ul>
                    {attendance.length > 0 ? (
                        attendance.map((record) => (
                            <li key={record.date}>
                                {new Date(record.date).toLocaleDateString()} - {record.status}
                            </li>
                        ))
                    ) : (
                        <li>No attendance records found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Attendance;
