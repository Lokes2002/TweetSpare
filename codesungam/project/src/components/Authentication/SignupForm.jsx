import React from 'react';
import { Button, Grid, Select, MenuItem, InputLabel, TextField, FormControl, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../Store/Auth/Action';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    dateOfBirth: Yup.object().shape({
        day: Yup.string().required("Day is required"),
        month: Yup.string().required("Month is required"),
        year: Yup.string().required("Year is required"),
    })
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const SignupForm = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            dateOfBirth: {
                day: '',
                month: '',
                year: ''
            }
        },
        validationSchema,
        onSubmit: (values) => {
            const { day, month, year } = values.dateOfBirth;
            const dateOfBirth = `${year}-${month}-${day}`;
            values.dateOfBirth = dateOfBirth;

            dispatch(registerUser(values))
            console.log("form value",values); // Dispatch registerUser action with form values
        },
    });

    const handleDateChange = (name) => (event) => {
        formik.setFieldValue("dateOfBirth", {
            ...formik.values.dateOfBirth,
            [name]: event.target.value,
        });
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name='fullName'
                        variant='outlined'
                        size='large'
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name='email'
                        variant='outlined'
                        size='large'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        name='password'
                        variant='outlined'
                        size='large'
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth error={formik.touched.dateOfBirth?.day && Boolean(formik.errors.dateOfBirth?.day)}>
                        <InputLabel>Date</InputLabel>
                        <Select
                            name="day"
                            fullWidth
                            onChange={handleDateChange("day")}
                            value={formik.values.dateOfBirth.day}
                        >
                            {days.map((day) => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.dateOfBirth?.day && formik.errors.dateOfBirth?.day}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth error={formik.touched.dateOfBirth?.month && Boolean(formik.errors.dateOfBirth?.month)}>
                        <InputLabel>Month</InputLabel>
                        <Select
                            name="month"
                            fullWidth
                            onChange={handleDateChange("month")}
                            value={formik.values.dateOfBirth.month}
                        >
                            {months.map((month) => (
                                <MenuItem key={month.value} value={month.value}>
                                    {month.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.dateOfBirth?.month && formik.errors.dateOfBirth?.month}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth error={formik.touched.dateOfBirth?.year && Boolean(formik.errors.dateOfBirth?.year)}>
                        <InputLabel>Year</InputLabel>
                        <Select
                            name="year"
                            fullWidth
                            onChange={handleDateChange("year")}
                            value={formik.values.dateOfBirth.year}
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{formik.touched.dateOfBirth?.year && formik.errors.dateOfBirth?.year}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid className="mt-20" item xs={12}>
                    <Button
                        sx={{ borderRadius: "29px", py: "15px", bgcolor: "blue" }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SignupForm;
