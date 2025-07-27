import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import SubscriptionModel from '../SubscriptionModel/SubscriptionModel';
import { useTheme } from '../../ThemeContext/ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const RightPart = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    const [openSubscriptionModel, setOpenSubscriptionModel] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [openSearchModal, setOpenSearchModal] = useState(false);

    const handleOpenSubscriptionModel = () => setOpenSubscriptionModel(true);
    const handleCloseSubscriptionModel = () => setOpenSubscriptionModel(false);

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/search?query=${value}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("jwt")}` },
                });
                setSuggestions(response.data);
                setOpenSearchModal(true);
            } catch (error) {
                console.error('Error fetching user suggestions:', error);
            }
        } else {
            setSuggestions([]);
            setOpenSearchModal(false);
        }
    };

    const handleUserClick = (userId) => {
        window.location.href = `/profile/${userId}`;
    };

    const closeSearchModal = () => {
        setOpenSearchModal(false);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`} style={{
            position: 'sticky',
            top: 0,
            width: '450px',
            height: '100vh',
            backgroundColor: darkMode ? '#000' : '#fff',
            paddingLeft: '20px',
            borderLeft: darkMode ? '1px solid #555' : '1px solid #ccc',
            padding: '20px',
            boxSizing: 'border-box',
            zIndex: 1000,
            overflow: 'hidden',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
            <div className='relative flex items-center'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={`py-3 rounded-full w-full pl-12 ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                />
                <div className='absolute top-0 left-0 pl-3 pt-3'>
                    <SearchIcon className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
                </div>
                <Brightness6Icon className='ml-3 cursor-pointer' onClick={toggleDarkMode} style={{ color: darkMode ? '#fff' : '#000' }} />
                
                {openSearchModal && (
                    <div className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-y-auto" style={{ top: '100%', left: 0 }}>
                        <div className="flex justify-between items-center p-2">
                            <h2 className="font-bold text-lg">Suggestions</h2>
                            <CloseIcon className="cursor-pointer" onClick={closeSearchModal} />
                        </div>
                        <ul className="suggestions-list">
                            {suggestions.map((user) => (
                                <li key={user.id} onClick={() => handleUserClick(user.id)} className="cursor-pointer hover:bg-gray-200 p-2 text-sm">
                                    {user.fullName}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <section className={`my-5 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`} style={{ border: '1px solid #555', borderRadius: '8px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h1 className='text-xl font-bold'>Get Verified</h1>
                <h1 className='font-bold my-2'>Subscribe to unlock new features</h1>
                <Button
                    variant='contained'
                    sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px", backgroundColor: '#1e88e5', color: '#fff' }}
                    onClick={handleOpenSubscriptionModel}
                >
                    Get Verified
                </Button>
            </section>
            <section className={`mt-7 space-y-5 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`} style={{ border: '1px solid #555', borderRadius: '8px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <h1 className='font-bold text-xl py-1'>What's happening</h1>
                <div>
                    <p className='text-sm'>FIFA Women's World Cup . LIVE</p>
                    <p className='font-bold'>Philippines vs Switzerland</p>
                </div>
                {[1, 2, 3].map((item, index) => (
                    <div key={index} className='flex justify-between w-full'>
                        <div>
                            <p>Entertainment . Trending</p>
                            <p className='font-bold'>#TheMarvels</p>
                            <p>34.3k Tweets</p>
                        </div>
                        <MoreHorizIcon style={{ color: darkMode ? '#ffffff' : '#000' }} />
                    </div>
                ))}
            </section>
            <section>
                <SubscriptionModel open={openSubscriptionModel} handleClose={handleCloseSubscriptionModel} />
            </section>
        </div>
    );
};

export default RightPart;
