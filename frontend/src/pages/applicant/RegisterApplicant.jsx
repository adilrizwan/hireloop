import { Grid, Avatar, Paper, Button, Input, ThemeProvider, Typography, TextField, MenuItem, InputLabel, Box, FormControl } from '@mui/material'
import React from 'react'
import { useState, useEffect } from "react";
import { theme, bgImg, paperStyle, margins, buttonPlacement, selectMenus } from '../../constants/theme'
import { countries } from "../../constants/countries"
import { TextMaskCustom } from "../../constants/phoneNumber"
import { genderArr } from "../../constants/selectMenus"
import station from "../../images/station.jpg"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { Select } from '@mui/material';

function RegisterApplicant() {
    const [terms, setTerms] = useState(false)
    const [details, setDetails] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        password: "",
        highestEducation: "",
        major: "",
        institution: "",
        phoneNumber: "",
        city: "",
        country: "",
        bio: "",
    })
    const { firstName, lastName, gender, dob, email, password, highestEducation, major, institution, phoneNumber, city, country, bio } = details

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
        else {
            console.log(details)
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
                                name="dob"
                                required
                                label="Date of Birth"
                                value={dob}
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

                            // inputProps={{ pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$" }}

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
                                    value={phoneNumber}
                                    onChange={handleChange}
                                    placeholder="eg. (3xx) xxx-xxxx"
                                    name="phoneNumber"
                                    id="formatted-text-mask-input"
                                    inputComponent={TextMaskCustom}
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
export default RegisterApplicant

