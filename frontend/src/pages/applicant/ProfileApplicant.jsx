import * as React from 'react';
import axios from 'axios';
import { Grid, Paper, Button, Input, ThemeProvider, Typography, TextField, MenuItem, InputLabel, Box, FormControl, Avatar } from '@mui/material'
import { useState } from "react";
import { theme, paperStyle, margins, buttonPlacement, selectMenus } from '../../constants/theme'
import { countries } from "../../constants/countries"
import { TextMaskCustom } from "../../constants/phoneNumber"
import { genderArr } from "../../constants/selectMenus"
import { Select } from '@mui/material';
import { toast } from 'react-toastify'
import { useEffect } from 'react';

export function ProfileApplicant() {
    const token = localStorage.getItem('user');
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        DOB: '',
        highestEducation: '',
        major: '',
        institution: '',
        phoneNo: '',
        city: '',
        country: '',
        bio: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/applicant/profile', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [token]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put('/applicant/profile', data, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            toast.success('Update Successful.');
            toast.warn('Some changes might take effect after you login next time.');
        } catch (error) {
            toast.error('Update failed: ' + error.response.data.message + '.');
            console.log(error.response.request.status);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid>
                <Paper sx={{ mt: 3, mb: 3 }}>
                    <Paper elevation={0} style={paperStyle}>
                        <Grid align="center">
                            <Avatar style={{ backgroundColor: theme.palette.primary.main }} />
                            <Typography variant="h2">Update Profile</Typography>
                        </Grid>
                        <form controlled onChange={handleChange} onSubmit={onSubmit}>
                            <Grid item>
                                <TextField
                                    style={margins}
                                    name="firstName"
                                    value={data.firstName}
                                    onChange={handleChange}
                                    label="First Name"
                                    helperText="First Name"
                                    variant="standard"
                                />
                                <TextField
                                    style={margins}
                                    name="lastName"
                                    value={data.lastName}
                                    onChange={handleChange}
                                    label="Last Name"
                                    helperText="Last Name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <FormControl sx={selectMenus}>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={data.gender}
                                        label="Gender"
                                        onChange={(e) => setData({ ...data, gender: e.target.value })}
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
                                    label="Date of Birth"
                                    value={data.DOB}
                                    onChange={handleChange}
                                    sx={selectMenus}
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    style={margins}
                                    name="highestEducation"
                                    value={data.highestEducation}
                                    onChange={handleChange}
                                    label={"Highest Education"}
                                    variant="standard"

                                />
                                <TextField
                                    style={margins}
                                    name="major"
                                    value={data.major}
                                    onChange={handleChange}
                                    label={"Major"}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid align="left">
                                <TextField
                                    style={margins}
                                    name='institution'
                                    value={data.institution}
                                    onChange={handleChange}
                                    label="Institution"
                                    variant="standard"
                                />
                                <FormControl style={margins} variant="standard">
                                    <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
                                    <Input
                                        name="phoneNo"
                                        value={data.phoneNo}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        inputComponent={TextMaskCustom}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid align="left">
                                <TextField
                                    style={margins}
                                    value={data.city}
                                    name='city'
                                    onChange={handleChange}
                                    label="City"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid>
                                <FormControl>
                                    <InputLabel sx={selectMenus}>Country</InputLabel>
                                    <Select
                                        sx={selectMenus}
                                        value={data.country}
                                        label='Country'
                                        onChange={(e) => {
                                            setData({ ...data, country: e.target.value });
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
                                    variant="outlined"
                                    value={data.bio}
                                    name='bio'
                                    onChange={handleChange}
                                    label="Bio"
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                            <Grid align="center">
                                <Button
                                    style={buttonPlacement}
                                    variant="contained"
                                    size='large'
                                    onClick={onSubmit}
                                    color="primary">
                                    Update
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Paper>
            </Grid>
        </ThemeProvider >
    );
}

