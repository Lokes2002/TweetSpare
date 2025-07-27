import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Auth/Action';
import { useTheme } from '../../ThemeContext/ThemeContext';
import { navigationMenu } from './NavigationMenu';

const Navigation = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { darkMode } = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  const user = auth.user;

  const avatarUrl = user?.image
    ? user.image.startsWith('http')
      ? user.image
      : `http://localhost:5000/uploads/${user.image}`
    : '/default-avatar.png';

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#000' : '#fff',
        padding: '20px',
        boxSizing: 'border-box',
        color: darkMode ? '#fff' : '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '250px',
      }}
    >
      {/* 🔼 Top: Logo + Navigation Items */}
      <div>
        <div style={{ padding: '20px 0' }}>
          <img src="photo1.jpg" alt="logo" style={{ width: '100%' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          {navigationMenu(user).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 50px',
                  borderRadius: '8px',
                  marginBottom: '14px',
                  color: darkMode ? '#fff' : '#000',
                  backgroundColor: isActive
                    ? darkMode
                      ? '#222'
                      : '#f0f0f0'
                    : 'transparent',
                  fontWeight: isActive ? 'bold' : 'normal',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = darkMode
                    ? '#1a1a1a'
                    : '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive
                    ? darkMode
                      ? '#222'
                      : '#f0f0f0'
                    : 'transparent';
                }}
              >
                <span style={{ color: isActive ? '#1d9bf0' : 'inherit' }}>
                  {item.icon}
                </span>
                <p
                  style={{
                    marginLeft: '10px',
                    fontSize: '17px',
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? '#1d9bf0' : darkMode ? '#fff' : '#000',
                  }}
                >
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔽 Bottom: User Info + Logout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '50px',
          }}
        >
          <Avatar
            alt={user?.fullName || 'Username'}
            src={avatarUrl}
            style={{ marginRight: '10px' }}
          />
          <div>
            <p>{user?.fullName || 'No Name'}</p>
            <span style={{ opacity: 0.7 }}>
              @{user?.fullName
                ? user.fullName.split(' ').join('_').toLowerCase()
                : 'username'}
            </span>
          </div>
        </div>

        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{ color: darkMode ? '#fff' : '#000' }}
        >
          <MoreHorizIcon />
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            style: {
              backgroundColor: darkMode ? '#1a1a1a' : '#fff',
              color: darkMode ? '#fff' : '#000',
            },
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
