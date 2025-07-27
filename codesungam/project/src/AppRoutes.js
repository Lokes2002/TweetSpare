import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventList from './components/Events/EventList';
import ClassList from './components/Classes/ClassList';
import Dashboard from './components/Dashboard/dashboard';
import Attendance from './components/Classes/attandance';
import Event from './components/Events/event';
import Notification from './components/Notification/notification';
import HomePage from './components/HomePage/HomePage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/event" element={<EventList />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/attendance" element={<Attendance/>} />
            <Route path="/notification" element={<Notification/>} />
            <Route path="/events" element={<Event/>} />
            <Route path="/classes" element={<ClassList />} />
        </Routes>
    );
}

export default AppRoutes;
