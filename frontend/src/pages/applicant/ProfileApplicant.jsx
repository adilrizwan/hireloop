import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import axios from 'axios';
import { theme, buttonPlacement } from '../../constants/theme'
import { Grid, Button } from '@mui/material';
export default function ProfileApplicant() {
    const [data, setData] = React.useState([]);
    const token = localStorage.getItem('user');
    React.useEffect(() => {
        axios.get('/applicant/profile', {
            headers: {
                Authorization: `${token}`
            },
        })
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [token]);

    return (

        <ThemeProvider theme={theme}>
            <Paper
                sx={{
                    mt: 3,
                    mb: 3,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h6" fontSize={18} align='center'>
                    Profile
                </Typography>
                <Grid item align='left'>
                    <Typography variant='h6'>First Name</Typography>
                    <Typography>{data.firstName}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>Last Name</Typography>
                    <Typography>{data.lastName}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>Date of Birth</Typography>
                    <Typography>{data.DOB}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>Gender</Typography>
                    <Typography>{data.gender}</Typography>
                </Grid>
                <Grid align="left">
                    <Typography variant='h6'>Email</Typography>
                    <Typography>{data.email}</Typography>
                </Grid>
                <Grid align="left">
                    <Typography variant='h6'>Highest Education</Typography>
                    <Typography>{data.highestEducation}</Typography>
                </Grid>
                <Grid align="left">
                    <Typography variant='h6'>Major</Typography>
                    <Typography>{data.major}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>Institution</Typography>
                    <Typography>{data.institution}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>Phone Number</Typography>
                    <Typography>{data.phoneNo}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>City</Typography>
                    <Typography>{data.city}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>Country</Typography>
                    <Typography>{data.country}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>Bio</Typography>
                    <Typography>{data.bio}</Typography>
                </Grid>
                <Grid align="center">
                    <Button
                        style={buttonPlacement}
                        variant="contained"
                        size='large'
                        // onClick={onSubmit}
                        color="primary">
                        Update
                    </Button>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
}
