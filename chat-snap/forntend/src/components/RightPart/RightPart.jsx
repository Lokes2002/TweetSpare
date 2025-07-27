import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Avatar } from '@mui/material';
import { useTheme } from '../../ThemeContext/ThemeContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const RightPart = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const [removedSuggestions, setRemovedSuggestions] = useState([]);

  const fetchFollowSuggestions = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/suggestions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      setFollowSuggestions(res.data);
    } catch (err) {
      console.error('Error fetching follow suggestions:', err);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.put(`${API_BASE_URL}/api/users/${userId}/follow`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      });
      fetchFollowSuggestions();
    } catch (err) {
      console.error('Follow error:', err);
    }
  };

  const handleRemoveSuggestion = (userId) => {
    setRemovedSuggestions((prev) => [...prev, userId]);
  };

  useEffect(() => {
    fetchFollowSuggestions();
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/search?query=${value}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
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

  const visibleSuggestions = followSuggestions.filter(
    (user) => !removedSuggestions.includes(user.id)
  );

  const sectionStyle = {
    border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: darkMode ? '#000' : '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  return (
    <div
      className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
      style={{
        paddingLeft: '20px',
        padding: '20px',
        borderLeft: darkMode ? '1px solid #555' : '1px solid #ccc',
        width: '100%',
        maxWidth: '450px',
        boxSizing: 'border-box',
      }}
    >
      {/* 🔍 Search + Dark Mode */}
      <div className='relative flex items-center mb-5'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className={`py-3 rounded-full w-full pl-12 ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
        />
        <div className='absolute top-0 left-0 pl-3 pt-3'>
          <SearchIcon className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
        </div>
        <Brightness6Icon
          className='ml-3 cursor-pointer'
          onClick={toggleDarkMode}
          style={{ color: darkMode ? '#fff' : '#000' }}
        />

        {openSearchModal && (
          <div className="absolute z-10 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-y-auto" style={{ top: '100%', left: 0 }}>
            <div className="flex justify-between items-center p-2">
              <h2 className="font-bold text-lg">Suggestions</h2>
              <CloseIcon className="cursor-pointer" onClick={closeSearchModal} />
            </div>
            <ul>
              {suggestions.map((user) => (
                <li key={user.id} onClick={() => handleUserClick(user.id)} className="cursor-pointer hover:bg-gray-200 p-2 text-sm">
                  {user.fullName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 👤 Who to follow */}
      <section style={sectionStyle}>
        <h1 className='text-xl font-bold mb-4'>Who to follow</h1>
        {visibleSuggestions.length === 0 && <p className='text-sm'>No suggestions available</p>}

        {visibleSuggestions.map((user) => (
          <div key={user.id} className='flex items-center justify-between mb-3'>
            <div className='flex items-center cursor-pointer' onClick={() => handleUserClick(user.id)}>
              <Avatar src={user.image} alt={user.fullName} />
              <div className='ml-3'>
                <p className='font-bold text-sm'>{user.fullName}</p>
                <p className='text-xs text-gray-500'>@{user.email?.split('@')[0]}</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                onClick={() => handleFollow(user.id)}
                variant="contained"
                size="small"
                sx={{ borderRadius: '20px', textTransform: 'none' }}
              >
                Follow
              </Button>
              <CloseIcon
                className="cursor-pointer"
                onClick={() => handleRemoveSuggestion(user.id)}
                style={{ fontSize: '18px' }}
              />
            </div>
          </div>
        ))}
      </section>

      {/* 📈 Trending */}
      <section style={sectionStyle}>
        <h1 className='font-bold text-xl pb-2'>What's happening</h1>
        <div>
          <p className='text-sm'>FIFA Women's World Cup · LIVE</p>
          <p className='font-bold'>Philippines vs Switzerland</p>
        </div>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className='flex justify-between w-full pt-4'>
            <div>
              <p className='text-sm'>Entertainment · Trending</p>
              <p className='font-bold'>#TheMarvels</p>
              <p className='text-sm'>34.3k Tweets</p>
            </div>
            <MoreHorizIcon style={{ color: darkMode ? '#ffffff' : '#000' }} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default RightPart;
