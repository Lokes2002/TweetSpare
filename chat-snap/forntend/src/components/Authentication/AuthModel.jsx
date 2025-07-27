import React, { useState } from 'react';
import { Button, Modal, Box, Typography, Stack } from '@mui/material';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400, md: 500 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const AuthModal = ({ open, handleClose }) => {
    const [isSignup, setIsSignup] = useState(true);

    const toggleForm = () => {
        setIsSignup(prev => !prev);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="auth-modal-title"
            aria-describedby="auth-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="auth-modal-title"
                    align="center"
                    variant="h5"
                    fontWeight={600}
                    mb={3}
                >
                    {isSignup ? 'Create your account' : 'Sign in to your account'}
                </Typography>

                <Box width="100%" display="flex" justifyContent="center">
                    {isSignup ? (
                        <SignupForm handleClose={handleClose} />
                    ) : (
                        <SigninForm handleClose={handleClose} />
                    )}
                </Box>

                <Typography align="center" mt={3} color="text.secondary">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                </Typography>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={toggleForm}
                    sx={{ mt: 1.5, borderRadius: '30px', py: 1 }}
                >
                    {isSignup ? 'Sign In' : 'Sign Up'}
                </Button>
            </Box>
        </Modal>
    );
};

export default AuthModal;
