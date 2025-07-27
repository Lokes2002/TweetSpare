// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Authentication from './components/Authentication/Authentication';
import HomePage from './components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';
import { ThemeProvider } from './ThemeContext/ThemeContext';
import Dashboard from './components/Dashboard/dashboard';
import CustomNavbar from './components/Navbar/CustomNavbar';
import Attendance from './components/Classes/attandance';
import Notification from './components/Notification/notification';

function App() {
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            dispatch(getUserProfile(jwt))
                .catch(error => {
                    console.error("Failed to get user profile:", error);
                    navigate('/login'); 
                });
        }
    }, [dispatch, jwt, navigate]);

    return (
        <ThemeProvider>
            <CustomNavbar/>
            <div className="">
                <Routes>
                    <Route path="/*" element={<HomePage/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/attendance" element={<Attendance/>} />
                    <Route path="/notification" element={<Notification/>} />

                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
