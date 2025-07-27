import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Typography, Box } from '@mui/material';
import { verifyEmail } from '../../Store/Auth/Action';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { verifying, verifiedMessage, verifyError } = useSelector(state => state.emailVerification);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            dispatch(verifyEmail(token));
            setTimeout(() => navigate("/signin"), 2000);
        }
    }, [dispatch, navigate]);

    return (
        <Box sx={{ p: 4, textAlign: "center" }}>
            {verifying && <CircularProgress />}
            <Typography variant="h5" sx={{ mt: 2 }}>
                {verifiedMessage || verifyError}
            </Typography>
        </Box>
    );
};

export default EmailVerification;
