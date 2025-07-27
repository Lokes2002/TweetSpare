import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Auth/Action';
import { useTheme } from '../../ThemeContext/ThemeContext';
import { navigationMenu } from './NavigationMenu';

const Navigation = () => {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { darkMode } = useTheme();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        handleClose();
        dispatch(logout());
    };

    return (
        <div style={{
            height: '100vh',
            backgroundColor: darkMode ? '#000' : '#fff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            boxSizing: 'border-box',
            color: darkMode ? '#fff' : '#000',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            borderRight: darkMode ? '1px solid #555' : '1px solid #ccc',
            justifyContent: 'space-between'
        }}>
            <div>
                <div style={{ padding: '20px 0' }}>
                    <img src="photo1.jpg" alt="logo" style={{ width: '100%' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    {navigationMenu.map((item) => (
                        <div
                            key={item.title}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                borderRadius: '8px',
                                marginBottom: '14px',
                                backgroundColor: 'transparent',
                                color: darkMode ? '#fff' : '#000',
                            }}
                            onClick={() => item.title === "Profile" ? navigate(`/profile/${auth.user?.id}`) : navigate(item.path)}
                        >
                            {item.icon}
                            <p style={{ marginLeft: '10px', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt={auth.user?.fullName || "Username"}
                        src={auth.user?.avatar || "default-avatar-url.jpg"}
                        style={{ marginRight: '10px' }}
                    />
                    <div>
                        <p style={{ fontWeight: 'bold' }}>{auth.user?.fullName || "No Name"}</p>
                        <span style={{ opacity: 0.7 }}>
                            @{auth.user?.fullName ? auth.user.fullName.split(" ").join("_").toLowerCase() : "username"}
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
                        style: { backgroundColor: darkMode ? '#1a1a1a' : '#fff', color: darkMode ? '#fff' : '#000' }
                    }}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Navigation;
