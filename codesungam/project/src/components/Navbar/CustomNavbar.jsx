import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import avatar from './img1.jpg';
import { logout } from '../../Store/Auth/Action';
import { useTheme } from '../../ThemeContext/ThemeContext';

function CustomNavbar() {
    const dispatch = useDispatch();
    const { darkMode } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo/Brand */}
                    <Link to="/" className="text-2xl font-bold hover:text-blue-600 no-underline">
                        Campus Tracker
                    </Link>

                    {/* Hamburger Icon for Mobile */}
                    <div className="block lg:hidden">
                        <button
                            className="focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{ color: darkMode ? '#fff' : '#000' }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className={`lg:flex space-x-6 ${menuOpen ? 'block' : 'hidden'}`}>
                        <Link to="/" className="hover:text-blue-600 transition duration-300 no-underline">Home</Link>
                        <Link to="/dashboard" className="hover:text-blue-600 transition duration-300 no-underline">Dashboard</Link>
                        <Link to="/events" className="hover:text-blue-600 transition duration-300 no-underline">Events</Link>
                        <Link to="/attendance" className="hover:text-blue-600 transition duration-300 no-underline">Classes</Link>
                        <Link to="/notification" className="hover:text-blue-600 transition duration-300 no-underline">Notification</Link>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            className="flex items-center focus:outline-none"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <img
                                src={avatar}
                                alt="Profile"
                                className="rounded-full w-10 h-10 border border-gray-300 hover:border-blue-400 transition duration-300"
                            />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48" style={{ backgroundColor: darkMode ? '#1a1a1a' : '#fff' }}>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 transition duration-300 no-underline" style={{ color: darkMode ? '#fff' : '#000' }}>
                                    Profile
                                </Link>
                                <div className="border-t border-gray-200"></div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300"
                                    style={{ color: darkMode ? '#fff' : '#000' }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white shadow-lg">
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100 no-underline">Home</Link>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 no-underline">Dashboard</Link>
                    <Link to="/events" className="block px-4 py-2 hover:bg-gray-100 no-underline">Events</Link>
                    <Link to="/attendance" className="block px-4 py-2 hover:bg-gray-100 no-underline">Classes</Link>
                    <Link to="/notification" className="block px-4 py-2 hover:bg-gray-100 no-underline">Notification</Link>
                </div>
            )}
        </nav>
    );
}

export default CustomNavbar;
