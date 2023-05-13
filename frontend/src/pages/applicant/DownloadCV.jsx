import React from 'react';
import { ThemeProvider, Grid, Paper, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { theme } from '../../constants/theme';
import { toast } from 'react-toastify'
import axios from 'axios';

export function DownloadCV() {
    const token = localStorage.getItem('token');
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.get('/applicant/profile/generate-cv', {
                headers: {
                    Authorization: `${token}`
                },
            });
        } catch (error) {
            toast.error('Download failed: ' + error.response.data.message + '.');
            console.log(error);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12}>
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
                        CV
                    </Typography>

                    <Grid align='center'>
                        <Button
                            style={{ marginTop: '16px' }}
                            variant="contained"
                            size='large'
                            onClick={onSubmit}
                            color="primary"
                        >
                            Download
                            <DownloadIcon fontSize="small" />
                        </Button>
                    </Grid>
                </Paper>
            </Grid >
        </ThemeProvider >
    );
}

export default DownloadCV;
