import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Grid, Select, Paper, Button, Input, ThemeProvider, Typography, TextField, MenuItem, InputLabel, Box, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { theme, paperStyle, margins, buttonPlacement, selectMenus } from '../../constants/theme'
import { countries } from "../../constants/countries"
import { TextMaskCustom } from "../../constants/phoneNumber"
import { companyTypeArr, years } from "../../constants/selectMenus"
import { toast } from 'react-toastify'

export default function ProfileEmployer() {
    const token = localStorage.getItem('token');
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);

    const [data, setData] = React.useState({
        companyName: "",
        estdYear: "",
        noOfEmployees: "",
        productDomain: "",
        companyType: "",
        website: "",
        phoneNo: "",
        hqCity: "",
        hqCountry: "",
        about: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/employer/profile', {
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
        setOpenConfirm(false);
        if (isNaN(data.noOfEmployees)) {
            toast.error("Please enter valid numbers for Number of Employees.");
            return;
        }
        try {
            await axios.put('/employer/profile', data, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            toast.success('Update Successful.');
            toast.warn('Some changes might take effect after you login next time.');
        } catch (error) {
            toast.error('Update failed: ' + error.response.data.message + '.');
            console.log(error);
        }
    };

    const handleViewConfirm = () => {
        setOpenConfirm(true);
        setDialogContent(
            <Typography>
                Are you sure you want to update your profile?
            </Typography>
        )
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid>
                <Paper sx={{ mt: 3, mb: 3 }}>
                    <Paper elevation={0} style={paperStyle}>
                        <Grid align="center">
                            <Typography variant="h6" fontSize={18} align='center'>
                                Update Profile
                            </Typography>
                        </Grid>
                        <form onChange={handleChange} onSubmit={onSubmit}>
                            <Grid item>
                                <TextField
                                    style={margins}
                                    name="companyName"
                                    value={data.companyName}
                                    onChange={handleChange}
                                    label="Company Name"
                                    helperText="Company Name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item>
                                <FormControl sx={selectMenus}>
                                    <InputLabel>Established Year</InputLabel>
                                    <Select
                                        value={data.estdYear}
                                        label="Established Year"
                                        onChange={(e) => setData({ ...data, type: e.target.value })}
                                    >
                                        {years.map((s, i) => (
                                            <MenuItem key={i} value={s}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={selectMenus}>
                                    <InputLabel>Company Type</InputLabel>
                                    <Select
                                        value={data.companyType}
                                        label="Company Type"
                                        onChange={(e) => setData({ ...data, companyType: e.target.value })}
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
                                    name="noOfEmployees"
                                    value={data.noOfEmployees}
                                    onChange={handleChange}
                                    label="Number of Employees"
                                    variant="standard"
                                />
                                <TextField
                                    style={margins}
                                    name="productDomain"
                                    label="Product Domain"
                                    value={data.productDomain}
                                    onChange={handleChange}
                                    variant="standard"
                                />
                            </Grid>
                            <Grid align="left">
                                <TextField
                                    style={margins}
                                    name='website'
                                    value={data.website}
                                    onChange={handleChange}
                                    label="Website"
                                    variant="standard"
                                />
                                <FormControl style={margins} variant="standard">
                                    <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
                                    <Input
                                        name="phoneNo"
                                        value={data.phoneNo}
                                        placeholder="Phone Number"
                                        inputComponent={TextMaskCustom}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid align="left">
                                <TextField
                                    style={margins}
                                    value={data.hqCity}
                                    name='hqCity'
                                    onChange={handleChange}
                                    label="City"
                                    variant="standard"
                                />
                                <Grid>
                                    <FormControl>
                                        <InputLabel sx={selectMenus}>Country</InputLabel>
                                        <Select
                                            sx={selectMenus}
                                            value={data.hqCountry}
                                            label='Country'
                                            onChange={(e) => {
                                                setData({ ...data, hqCountry: e.target.value });
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
                            </Grid>
                            <Grid>
                                <TextField
                                    style={{ minWidth: 300, margin: "15px 60px 5px 5px" }}
                                    label="About"
                                    variant="outlined"
                                    value={data.about}
                                    name='about'
                                    onChange={handleChange}
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                        </form>
                        <Grid align="center">
                            <Button
                                style={buttonPlacement}
                                variant="contained"
                                size='large'
                                onClick={handleViewConfirm}
                                color="primary">
                                Update
                            </Button>
                        </Grid>
                        <Dialog open={openConfirm} onClose={handleCloseConfirm} maxWidth="md" fullWidth>
                            <DialogTitle align='center'>Update</DialogTitle>
                            <DialogContent>{dialogContent}</DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    size='small'
                                    onClick={onSubmit}
                                    color="primary">
                                    Yes, I'm sure
                                </Button>
                                <Button
                                    onClick={handleCloseConfirm}>
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                </Paper>
            </Grid>
        </ThemeProvider >
    );
}

