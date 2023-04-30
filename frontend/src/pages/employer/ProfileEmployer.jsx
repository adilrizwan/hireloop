import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import axios from 'axios';
import { theme, buttonPlacement } from '../../constants/theme'
import { Grid, Button } from '@mui/material';
export default function ProfileEmployer() {
    const [data, setData] = React.useState([]);
    const token = localStorage.getItem('user');
    React.useEffect(() => {
        axios.get('/employer/profile', {
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
                    <Typography variant='h6'>Company Name</Typography>
                    <Typography>{data.companyName}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>Established Year</Typography>
                    <Typography>{data.estdYear}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>Number of Employees</Typography>
                    <Typography>{data.noOfEmployees}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>Company Type</Typography>
                    <Typography>{data.companyType}</Typography>
                </Grid>
                <Grid align="left">
                    <Typography variant='h6'>Product Domain</Typography>
                    <Typography>{data.productDomain}</Typography>
                </Grid>
                <Grid align="left">
                    <Typography variant='h6'>Email</Typography>
                    <Typography>{data.email}</Typography>
                </Grid>
                <Grid align="left">
                    <Typography variant='h6'>Website</Typography>
                    <Typography>{data.website}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>Phone Number</Typography>
                    <Typography>{data.phoneNo}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>City</Typography>
                    <Typography>{data.hqCity}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>Country</Typography>
                    <Typography>{data.hqCountry}</Typography>
                </Grid>
                <Grid>
                    <Typography variant='h6'>About</Typography>
                    <Typography>{data.about}</Typography>
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
