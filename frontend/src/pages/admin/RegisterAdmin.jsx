import { Grid, Avatar, Paper, Button, ThemeProvider, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { theme, bgImg, paperStyle, margins, buttonPlacement } from '../../constants/theme'
import admin from "../../images/admin.jpg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterAdmin() {
    const [terms, setTerms] = React.useState(false)
    const [details, setDetails] = React.useState({
        role: "Admin",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
    })
    const { firstName, lastName, email, password, password2 } = details

    const handleTerms = (event) => {
        setTerms(event.target.checked);
    };
    const navigate = useNavigate()
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!terms) {
            toast.error("Please accept the terms and conditions");
        }
        else if (details.password !== details.password2) {
            toast.error("Passwords do not match.")
        }
        else {
            axios.post('/register/admin', details)
                .then(() => {
                    toast.success("Registration Successful. Redirecting to login page.");
                    (async () => {
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        navigate('/admin/login');
                    })();
                })
                .catch((error) => {
                    if (error.response.request.status === 403) {
                        toast.warn("User already exists. Log in instead.")
                    } else {
                        toast.error("Registration failed: " + error.response.data.message)
                        console.log(error)
                    }
                })
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid style={bgImg(admin).background}>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={{ backgroundColor: theme.palette.accent.main }} />
                        <Typography variant="h2">Register as an Admin</Typography>
                    </Grid>
                    <form onSubmit={onSubmit}>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="firstName"
                                required
                                value={firstName}
                                onChange={handleChange}
                                label="First Name"
                                helperText="(Required)"
                                placeholder="eg. Ali"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                name="lastName"
                                required
                                value={lastName}
                                onChange={handleChange}
                                label="Last Name"
                                helperText="(Required)"
                                placeholder="eg. Raza"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="email"
                                required
                                value={email}
                                onChange={handleChange}
                                label="Company Email"
                                placeholder="eg. email@hireloop.com"
                                helperText="(Required)"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                name="password"
                                required
                                label="Password"
                                value={password}
                                onChange={handleChange}
                                helperText="(Minimum 8 characters)"
                                variant="standard"
                                type="password"
                                inputProps={{ minLength: 8 }}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                style={margins}
                                name="password2"
                                required
                                label="Confirm Password"
                                value={password2}
                                onChange={handleChange}
                                helperText="(Minimum 8 characters)"
                                variant="standard"
                                type="password"
                                inputProps={{ minLength: 8 }}
                            />
                        </Grid>
                        <Grid align='left'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={terms}
                                        onChange={handleTerms}
                                        name="terms"
                                        color="primary"
                                    />
                                }
                                label="I accept the terms & conditions"
                            />
                        </Grid>
                        <Grid align="center">
                            <Button
                                style={buttonPlacement}
                                variant="contained"
                                size='large'
                                onClick={onSubmit}
                                color="primary">
                                Register
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </ThemeProvider>
    )
}