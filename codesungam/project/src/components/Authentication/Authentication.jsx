import React, { useState } from 'react';
import { Button, Grid, Box, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import AuthModal from './AuthModel'; 

const Authentication = () => {
    const [openAuthModel, setOpenAuthModel] = useState(false);

    const handleOpenAuthModel = () => setOpenAuthModel(true);
    const handleCloseAuthModel = () => setOpenAuthModel(false);

    return (
        <Box
            sx={{
                fontFamily: '"Poppins", sans-serif',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                display: 'flex',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
                textAlign: 'center',
                padding: '0 10px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: { xs: '90%', sm: '90%', md: '70%', lg: '50%' },
                    background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background to improve readability
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px)',
                    borderRadius: '10px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    transition: 'height 0.2s ease',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: { xs: '20px', sm: '40px' },
                }}
            >
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ px: 3 }}>
                        <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem', lg: '4rem' } }}>
                            LET'S JOIN US
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', py: 4, fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.5rem' } }}>
                            ENJOY THIS MOMENT TODAY
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: '330px', mx: 'auto' }}>
                            <GoogleLogin 
                                onSuccess={(response) => console.log(response)} 
                                onFailure={(response) => console.error(response)} 
                                width={330} 
                            />
                            <Typography variant="body1" sx={{ py: 2 }}>
                                OR
                            </Typography>
                            <Button 
                                onClick={handleOpenAuthModel} 
                                fullWidth 
                                variant="contained" 
                                size="large" 
                                sx={{ borderRadius: '29px', py: 1 }}
                            >
                                Create Account
                            </Button>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 5 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                Already Have Account
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
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <AuthModal open={openAuthModel} handleClose={handleCloseAuthModel} />
            </Box>
        </Box>
    );
}

export default Authentication;
