import { Grid, Avatar, Paper, Button, ThemeProvider, Typography, TextField } from '@mui/material'
import React from 'react'
import { useState } from "react";
import { theme, bgImg, paperStyle, margins, buttonPlacement } from '../../constants/theme'
import admin from "../../images/admin.jpg"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'

function RegisterAdmin() {
    const [terms, setTerms] = useState(false)
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const { firstName, lastName, email, password } = details

    const handleTerms = (event) => {
        setTerms(event.target.checked);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!terms) {
            alert("Please accept the terms and conditions");
        }
        else{
          console.log(details)
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
export default RegisterAdmin

