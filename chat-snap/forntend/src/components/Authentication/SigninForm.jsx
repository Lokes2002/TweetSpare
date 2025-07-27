import React from 'react';
import './SigninForm.css';
import { Button, Grid, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../Store/Auth/Action';
import { blue } from '@mui/material/colors';

// ✅ Toast & Navigation
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const SigninForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ for redirection

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values))
                .unwrap()
                .then(() => {
                    // ✅ login success: redirect to home
                    navigate("/home");
                })
                .catch((error) => {
                    if (error === "Email not verified") {
                        toast.error("Please verify your email first.");

                        // ✅ Store email in localStorage for verification use
                        localStorage.setItem("verifyEmail", values.email);

                        // ✅ Redirect to verify page
                        navigate("/verify-email");
                    } else {
                        toast.error("Login failed. Please check credentials.");
                    }
                });
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
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
                            autoComplete="email"
                            autoFocus
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
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                        >
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <ToastContainer position="top-center" />
        </>
    );
};

export default SigninForm;
