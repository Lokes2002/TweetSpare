import React, { useState } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import AuthModal from './AuthModel';
import { loginWithGoogle } from '../../Store/Auth/Action';

const Authentication = () => {
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const dispatch = useDispatch();

    const handleOpenAuthModel = () => setOpenAuthModel(true);
    const handleCloseAuthModel = () => setOpenAuthModel(false);

    return (
        <Box
            sx={{
                fontFamily: '"Poppins", sans-serif',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    width: { xs: '95%', sm: '80%', md: '60%', lg: '45%' },
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '15px',
                    color: '#fff',
                    textAlign: 'center',
                    px: { xs: 3, sm: 6 },
                    py: { xs: 4, sm: 6 },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', sm: '3rem', lg: '3.5rem' },
                        mb: 2,
                    }}
                >
                    LET'S JOIN US
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.2rem', sm: '1.8rem', lg: '2rem' },
                        mb: 4,
                    }}
                >
                    ENJOY THIS MOMENT TODAY
                </Typography>

                <Box display="flex" justifyContent="center" mb={2}>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const googleToken = credentialResponse.credential;
                            console.log("Google Token:", googleToken);
                            dispatch(loginWithGoogle(googleToken));
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                        width={300}
                    />
                </Box>

                <Typography variant="body1" sx={{ py: 2 }}>
                    — OR —
                </Typography>

                <Button
                    onClick={handleOpenAuthModel}
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: '29px', py: 1, mb: 1 }}
                >
                    Create Account
                </Button>

                <Typography variant="body2" sx={{ mt: 1 }}>
                    By signing up, you agree to the Terms of Service and Privacy Policy.
                </Typography>

                <Box sx={{ mt: 5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Already Have an Account?
                    </Typography>
                    <Button
                        onClick={handleOpenAuthModel}
                        fullWidth
                        variant="outlined"
                        size="large"
                        sx={{
                            borderRadius: '29px',
                            py: 1,
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>

                <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
            </Box>
        </Box>
    );
};

export default Authentication;
