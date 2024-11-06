import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClassList() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes');
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes", error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div>
            <h2>Classes</h2>
            <ul>
                {classes.map(classItem => (
                    <li key={classItem.id}>{classItem.subject} - {classItem.schedule}</li>
                ))}
            </ul>
        </div>
    );
}

export default ClassList;
