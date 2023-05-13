import { Grid, FormControlLabel, Paper, Checkbox, Button, ThemeProvider, Typography, TextField } from '@mui/material'
import React from 'react'
import { theme, paperStyle, margins, buttonPlacement, selectMenus } from '../../constants/theme'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function CreateJob() {
    const [terms, setTerms] = React.useState(false)
    const [details, setDetails] = React.useState({
        title: "",
        location: "",
        employmentType: "",
        qualifications: "",
        experience: "",
        currency: "",
        salary: "",
        deadline: "",
        jobDesc: ""
    })
    const { title, location, employmentType, qualifications, experience, currency, salary, deadline, jobDesc } = details
    const token = localStorage.getItem('token');
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
            toast.error("Please accept the terms and conditions");
        }
        else if (details.title.length === 0 || details.employmentType.length === 0 || details.deadline.length === 0 || details.currency.length > 5) {
            toast.error("Please enter all required fields.");
        }
        else if (isNaN(details.salary) || isNaN(details.experience)) {
            toast.error("Please enter a valid number for salary and experience.");
        }
        else {
            axios.post('/employer/jobs/create', details, {
                headers: {
                    Authorization: `${token}`
                }
            })
                .then(() => {
                    toast.success("Successful!");
                })
                .catch((error) => {
                    toast.error("Failed: " + error.response.data.message + ".");
                    console.log(error);
                });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ mt: 3, mb: 3 }}>
                <Paper elevation={0} style={paperStyle}>
                    <Typography variant="h6" fontSize={18} align='center'>
                        Create Job
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="title"
                                required
                                value={title}
                                onChange={handleChange}
                                label="Job Title"
                                helperText="(Required)"
                                placeholder="eg. Architect"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                required
                                name="employmentType"
                                value={employmentType}
                                onChange={handleChange}
                                helperText="(Required)"

                                label="Employment Type"
                                placeholder="eg. Full-Time"
                                variant="standard"
                            />
                        </Grid>
                        <Grid align="left">
                            <TextField
                                style={margins}
                                value={currency}
                                name='currency'
                                required
                                helperText="(Required)"
                                onChange={handleChange}
                                label="Currency"
                                placeholder="eg. USD"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                required
                                name="salary"
                                label="Salary"
                                value={salary}
                                helperText="(Required)"
                                onChange={handleChange}
                                placeholder="eg. 50000"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                style={margins}
                                name="location"
                                value={location}
                                onChange={handleChange}
                                label="Location"
                                placeholder="New Jersey, USA"
                                variant="standard"
                            />
                            <TextField
                                style={margins}
                                name="qualifications"
                                label="Qualifications"
                                value={qualifications}
                                onChange={handleChange}
                                placeholder="eg. Bachelor's"
                                variant="standard"
                            />
                        </Grid>
                        <Grid align="left">
                            <TextField
                                style={margins}
                                name='experience'
                                value={experience}
                                onChange={handleChange}
                                label="Experience (years)"
                                placeholder="eg. 2"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                name="deadline"
                                label="Deadline"
                                value={deadline}
                                helperText="(Required)"
                                onChange={handleChange}
                                sx={selectMenus}
                                InputLabelProps={{ shrink: true }}
                                type="date"
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                style={{ minWidth: 300, margin: "15px 60px 5px 5px" }}
                                label="Job Description"
                                variant="outlined"
                                value={jobDesc}
                                name='jobDesc'
                                onChange={handleChange}
                                placeholder="Describe the role and its expectations."
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
                                Post
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </Paper>
        </ThemeProvider>
    )
}