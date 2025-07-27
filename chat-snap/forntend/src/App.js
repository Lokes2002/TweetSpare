// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import Authentication from './components/Authentication/Authentication';
import HomePage from './components/HomePage/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';
import { ThemeProvider } from './ThemeContext/ThemeContext';

// 👇 toast import karna hoga
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            dispatch(getUserProfile())
                .catch(error => {
                    console.error("Failed to get user profile:", error);
                    navigate('/login'); 
                });
        }
    }, [dispatch, jwt, navigate]);

    return (
        <ThemeProvider>
            <div>
                <Routes>
                    <Route path="/*" element={auth.user ? <HomePage /> : <Authentication />} />
                </Routes>
                
                {/* 👇 Yaha lagana zaroori hai */}
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </ThemeProvider>
    );
}

export default App;
