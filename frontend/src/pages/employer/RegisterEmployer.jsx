import { Grid, Avatar, Paper, Button, Input, ThemeProvider, Typography, TextField, MenuItem, InputLabel, Box, FormControl } from '@mui/material'
import React from 'react'
import { useState } from "react";
import { theme, bgImg, paperStyle, margins, buttonPlacement, selectMenus } from '../../constants/theme'
import { countries } from "../../constants/countries"
import { TextMaskCustom } from "../../constants/phoneNumber"
import { companyTypeArr, years } from "../../constants/selectMenus"
import office from "../../images/office2.jpg"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { Select } from '@mui/material';

function RegisterEmployer() {
    const [terms, setTerms] = useState(false)
    const [details, setDetails] = useState({
        companyName: "",
        estdYear: "",
        email: "",
        password: "",
        noOfEmployees: "",
        prodDomain: "",
        companyType: "",
        website: "",
        phoneNumber: "",
        city: "",
        country: "",
        about: "",
    })
    const { companyName, estdYear, email, password, noOfEmployees, prodDomain, companyType, website, phoneNumber, city, country, about } = details

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
            <Grid style={bgImg(office).background}>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={{ backgroundColor: theme.palette.secondary.main }} />
                        <Typography variant="h2">Register as an Employer</Typography>
                    </Grid>
                    <form onSubmit={onSubmit}>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="companyName"
                                required
                                value={companyName}
                                onChange={handleChange}
                                label="Company Name"
                                helperText="(Required)"
                                placeholder="eg. Hireloop"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <FormControl required sx={selectMenus}>
                                <InputLabel>Established Year</InputLabel>
                                <Select
                                    required
                                    value={estdYear}
                                    label="Established Year"
                                    onChange={(e) => setDetails({ ...details, estdYear: e.target.value })}
                                >
                                    {years.map((s, i) => (
                                        <MenuItem key={i} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl required sx={selectMenus}>
                                <InputLabel>Company Type</InputLabel>
                                <Select
                                    required
                                    value={companyType}
                                    label="Gender"
                                    onChange={(e) => setDetails({ ...details, companyType: e.target.value })}
                                >
                                    {companyTypeArr.map((s, i) => (
                                        <MenuItem key={i} value={s}>
                                            {s}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="email"
                                required
                                value={email}
                                onChange={handleChange}
                                label="Company Email"
                                placeholder="eg. email@domain.com"
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
                        <Grid item>
                            <TextField
                                style={margins}
                                name="noOfEmployees"
                                value={noOfEmployees}
                                onChange={handleChange}
                                label="Number of Employees"
                                placeholder="eg. 5000"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                name="prodDomain"
                                label="Product Domain"
                                value={prodDomain}
                                onChange={handleChange}
                                placeholder="eg. Advertising, IT"
                                variant="standard"
                            />
                        </Grid>
                        <Grid align="left">
                            <TextField
                                style={margins}
                                name='website'
                                value={website}
                                onChange={handleChange}
                                label="Website"
                                placeholder="eg. www.hireloop.com"
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
                                label="About"
                                variant="outlined"
                                value={about}
                                name='about'
                                onChange={handleChange}
                                placeholder="Introduce your company's vision"
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
export default RegisterEmployer

