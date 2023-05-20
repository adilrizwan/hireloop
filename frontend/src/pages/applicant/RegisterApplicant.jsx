import { Grid, Select, Checkbox, FormControlLabel, Avatar, Paper, Button, Input, ThemeProvider, Typography, TextField, MenuItem, InputLabel, Box, FormControl } from '@mui/material'
import React from 'react'
import { toast } from 'react-toastify'
import { theme, bgImg, paperStyle, margins, buttonPlacement, selectMenus } from '../../constants/theme'
import { countries } from "../../constants/countries"
import { TextMaskCustomReg } from "../../constants/phoneNumber"

import { genderArr } from "../../constants/selectMenus"
import station from "../../images/station.jpg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function RegisterApplicant() {
    const [terms, setTerms] = React.useState(false)
    const [details, setDetails] = React.useState({
        role: "Applicant",
        firstName: "",
        lastName: "",
        gender: "",
        DOB: "",
        email: "",
        password: "",
        password2: "",
        highestEducation: "",
        major: "",
        institution: "",
        phoneNo: "",
        city: "",
        country: "",
        bio: "",
    })
    const { firstName, lastName, gender, DOB, email, password, password2, highestEducation, major, institution, phoneNo, city, country, bio } = details

    const handleTerms = (event) => {
        setTerms(event.target.checked);
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevState) => ({ ...prevState, [name]: value }));
    };
    const navigate = useNavigate()
    const onSubmit = (event) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        event.preventDefault();
        if (!terms) {
            toast.error("Please accept the terms and conditions");
        } else if (password.length < 8) {
            toast.error("Password should be at least 8 characters long.");
        } else if (password !== password2) {
            toast.error("Passwords do not match.");
        } else if (!emailRegex.test(email)) {
            toast.error("Invalid email format");
        } else {
            axios.post('/register/applicant', details)
                .then(() => {
                    toast.success("Registration Successful. Redirecting to login page.");
                    (async () => {
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        navigate('/login');
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
            <Grid style={bgImg(station).background}>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }} />
                        <Typography variant="h2">Register as an Applicant</Typography>
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
                                placeholder="eg. John"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                name="lastName"
                                required
                                label="Last Name"
                                value={lastName}
                                onChange={handleChange}
                                helperText="(Required)"
                                placeholder="eg. Doe"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <FormControl required sx={selectMenus}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    required
                                    value={gender}
                                    label="Gender"
                                    onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                                >
                                    {genderArr.map((s, i) => (
                                        <MenuItem key={i} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                name="DOB"
                                required
                                label="Date of Birth"
                                value={DOB}
                                onChange={handleChange}
                                sx={selectMenus}
                                helperText="(Required)"
                                InputLabelProps={{ shrink: true }}
                                type="date"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="email"
                                required
                                value={email}
                                onChange={handleChange}
                                label="Email"
                                placeholder="eg. email@domain.com"
                                helperText="(Required)"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
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
                        <Grid item>
                            <TextField
                                style={margins}
                                name="highestEducation"
                                value={highestEducation}
                                onChange={handleChange}
                                label="Highest Education"
                                placeholder="eg. Diploma, BS, MS, PhD"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                name="major"
                                label="Major"
                                value={major}
                                onChange={handleChange}
                                placeholder="eg. Arts, Finance"
                                variant="standard"
                            />
                        </Grid>
                        <Grid align="left">
                            <TextField
                                style={margins}
                                name='institution'
                                value={institution}
                                onChange={handleChange}
                                label="Institution"
                                placeholder="eg. Hogwarts"
                                variant="standard"
                            />
                            <FormControl style={margins} variant="standard">
                                <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
                                <Input
                                    value={phoneNo}
                                    onChange={handleChange}
                                    placeholder="eg. (3xx) xxx-xxxx"
                                    name="phoneNo"
                                    id="formatted-text-mask-input"
                                    inputComponent={TextMaskCustomReg}
                                />
                            </FormControl>
                        </Grid>
                        <Grid align="left">
                            <TextField
                                style={margins}
                                value={city}
                                name='city'
                                onChange={handleChange}
                                label="City"
                                placeholder="eg. New York"
                                variant="standard"
                            />
                        </Grid>
                        <Grid>
                            <FormControl required>
                                <InputLabel sx={selectMenus}>Country</InputLabel>
                                <Select
                                    sx={selectMenus}
                                    required
                                    value={country}
                                    label='Country'
                                    onChange={(e) => {
                                        setDetails({ ...details, country: e.target.value });
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 250,
                                                width: 250,
                                            },
                                        },
                                    }}
                                    renderValue={(value) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {value}
                                        </Box>
                                    )}
                                >
                                    {countries.map((country, index) => (
                                        <MenuItem key={index} value={country.label}>
                                            <Box
                                                component="img"
                                                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                                sx={{ mr: 1 }}
                                            />
                                            {country.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid>
                            <TextField
                                style={{ minWidth: 300, margin: "15px 60px 5px 5px" }}
                                id="bio"
                                label="Bio"
                                variant="outlined"
                                value={bio}
                                name='bio'
                                onChange={handleChange}
                                placeholder="Briefly tell us about yourself"
                                multiline
                                rows={5}
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
