import React, { useState } from 'react';
import {
  Button, Grid, Select, MenuItem, InputLabel, TextField, FormControl,
  FormHelperText, Typography, Box, CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  dateOfBirth: Yup.object().shape({
    day: Yup.string().required('Day is required'),
    month: Yup.string().required('Month is required'),
    year: Yup.string().required('Year is required')
  })
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: 'January' }, { value: 2, label: 'February' },
  { value: 3, label: 'March' }, { value: 4, label: 'April' },
  { value: 5, label: 'May' }, { value: 6, label: 'June' },
  { value: 7, label: 'July' }, { value: 8, label: 'August' },
  { value: 9, label: 'September' }, { value: 10, label: 'October' },
  { value: 11, label: 'November' }, { value: 12, label: 'December' }
];

const SignupPage = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState('');

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      dateOfBirth: { day: '', month: '', year: '' }
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { day, month, year } = values.dateOfBirth;
      const birthDate = `${year}-${month}-${day}`;
      const payload = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        birthDate
      };

      try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/auth/signup', payload);
        toast.success('✔️ OTP sent to your email');
        setOtpSent(true);
        setEmailForOtp(values.email);
      } catch (error) {
        toast.error(error?.response?.data || 'Signup failed');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue('dateOfBirth', {
      ...formik.values.dateOfBirth,
      [name]: event.target.value
    });
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.warn('Please enter OTP');

    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/auth/verify-otp`, null, {
        params: { email: emailForOtp, otp }
      });
      toast.success('🎉 Email verified successfully');
      setOtpSent(false);
      formik.resetForm();
    } catch (error) {
      toast.error(error?.response?.data || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, p: 3, border: '1px solid #ddd', borderRadius: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {otpSent ? 'Verify OTP' : 'Create Your Account'}
      </Typography>

      {!otpSent ? (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Full Name" name="fullName" variant="outlined"
                value={formik.values.fullName} onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Email" name="email" variant="outlined"
                value={formik.values.email} onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Password" name="password" type="password" variant="outlined"
                value={formik.values.password} onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            {/* DOB Selectors */}
            <Grid item xs={4}>
              <FormControl fullWidth error={formik.touched.dateOfBirth?.day && Boolean(formik.errors.dateOfBirth?.day)}>
                <InputLabel>Day</InputLabel>
                <Select name="day" value={formik.values.dateOfBirth.day} onChange={handleDateChange('day')} label="Day">
                  {days.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
                <FormHelperText>{formik.errors.dateOfBirth?.day}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={formik.touched.dateOfBirth?.month && Boolean(formik.errors.dateOfBirth?.month)}>
                <InputLabel>Month</InputLabel>
                <Select name="month" value={formik.values.dateOfBirth.month} onChange={handleDateChange('month')} label="Month">
                  {months.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
                </Select>
                <FormHelperText>{formik.errors.dateOfBirth?.month}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={formik.touched.dateOfBirth?.year && Boolean(formik.errors.dateOfBirth?.year)}>
                <InputLabel>Year</InputLabel>
                <Select name="year" value={formik.values.dateOfBirth.year} onChange={handleDateChange('year')} label="Year">
                  {years.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                </Select>
                <FormHelperText>{formik.errors.dateOfBirth?.year}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit" fullWidth size="large" variant="contained"
                sx={{ borderRadius: 3, py: 1.5, backgroundColor: 'blue' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <>
          <TextField
            fullWidth label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth variant="contained" sx={{ py: 1.5, borderRadius: 3 }}
            onClick={handleVerifyOtp} disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Verify OTP'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default SignupPage;
