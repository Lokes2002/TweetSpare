import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import axios from 'axios';

const OtpVerificationModal = ({ open, onClose, email }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/verify-otp',
        null,
        {
          params: { email, otp },
        }
      );
      setMessage(response.data);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage('Something went wrong.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Verify Your Email</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">OTP sent to {email}</Typography>
        <TextField
          label="Enter OTP"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {message && (
          <Typography variant="body2" color="primary">
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleVerify} variant="contained">
          Verify
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OtpVerificationModal;
