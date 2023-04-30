import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import { theme, pageSize } from '../../constants/theme'

export function JobsApplied() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const token = localStorage.getItem('user');
    React.useEffect(() => {
        axios.get('/applicant/dashboard', {
            headers: {
                Authorization: `${token}`
            },
            params: {
                page: currentPage
            }
        })
            .then((response) => {
                setData(response.data)
                const totalCount = parseInt((response.data.Results.split(" "))[3])
                setTotalPages(Math.ceil(totalCount / pageSize))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [token, currentPage]);

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
                        Jobs Applied
                    </Typography>
                    <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                    {data.Applications && data.Applications.length > 0 ? (
                        <List>
                            {data.Applications && data.Applications.map((application, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={application.companyName} secondary={application.title}
                                    />
                                    <Typography variant="h6" fontSize={15} sx={{ color: application.status === 'REJECTED' ? theme.palette.error.main : application.status === 'ACCEPTED' ? theme.palette.secondary.main : theme.palette.accent.main, mr: '15px' }}>
                                        {application.status}
                                    </Typography>
                                    <Box>
                                        <Button
                                            style={{ margin: "10px" }}
                                            variant="contained"
                                            size='small'
                                            color="secondary">
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            color="error">
                                            Delete
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography align='center'>You have not applied to any jobs yet.</Typography>
                    )}
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                        sx={{
                            marginTop: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            '& .Mui-selected': {
                                color: 'primary.main',
                            },
                        }}
                    />
                </Paper>
            </Grid>
        </ThemeProvider>
    );
}