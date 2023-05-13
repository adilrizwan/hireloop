import * as React from 'react';
import axios from 'axios';
import { Button, ListItem, ListItemText, Pagination, Typography, TextField, ThemeProvider, Box, List, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { theme, pageSize, margins } from '../../constants/theme'

export function AppDashboard() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [openView, setOpenView] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);
    const [appID, setAppID] = React.useState();
    const token = localStorage.getItem('token');

    const handleAppIDChange = (event) => {
        setAppID(event.target.value);
    };
    
    React.useEffect(() => {
        axios.get('/admin/applicant/dashboard', {
            headers: {
                Authorization: `${token}`,
            },
            params: {
                page: currentPage,
                id: appID
            },
        })
            .then((response) => {
                setData(response.data);
                const totalCount = parseInt(response.data.Results.split(' ')[3]);
                setTotalPages(Math.ceil(totalCount / pageSize));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token, currentPage, appID]);
    const handleViewClick = (application) => {
        setOpenView(true);
        setDialogContent(
            <>
                <Typography>Company: {application.companyName}</Typography>
                <Typography>Title: {application.title}</Typography>
                <Typography>Employment Type: {application.employmentType}</Typography>
                <Typography>Experience (years): {application.experience}</Typography>
                <Typography>Qualifications: {application.qualfications}</Typography>
                <Typography>Currency: {application.currency}</Typography>
                <Typography>Salary: {application.salary}</Typography>
                <Typography>Location: {application.location}</Typography>
                <Typography>Job Description: {application.jobDesc}</Typography>
                <Typography>Status: {application.status}</Typography>
            </>
        )
    };

    const handleCloseView = () => {
        setOpenView(false);
    };

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
                        Applicant Dashboard
                    </Typography>
                    <form>
                        <Grid align='center'>
                            <TextField
                                style={margins}
                                name="appID"
                                required
                                value={appID}
                                label="Applicant ID"
                                onChange={handleAppIDChange}
                                placeholder="eg. 1007"
                                variant="standard"
                            />
                        </Grid>
                    </form>
                    <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                    {data.ApplicantName ? (
                        <>
                            <Typography sx={{ mb: 2 }} variant="h6" fontSize={18} align='center'>{data.ApplicantName}'s Dashboard</Typography>
                            {data.Applications && data.Applications.length > 0 ? (
                                <List>
                                    {data.Applications.map((application, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={application.companyName} secondary={application.title} />
                                            <Typography
                                                variant="h6"
                                                fontSize={15}
                                                sx={{
                                                    color:
                                                        application.status === "REJECTED"
                                                            ? theme.palette.error.main
                                                            : application.status === "ACCEPTED"
                                                                ? theme.palette.primary.main
                                                                : application.status === "CONTACTED"
                                                                    ? theme.palette.accent.main
                                                                    : theme.palette.tertiary.black,
                                                    mr: "15px"
                                                }}
                                            >
                                                {application.status}
                                            </Typography>
                                            <Box>
                                                <Button
                                                    style={{ margin: "10px" }}
                                                    variant="contained"
                                                    size="small"
                                                    color="secondary"
                                                    onClick={() => handleViewClick(application)}
                                                >
                                                    View
                                                </Button>
                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography align="center">User has not applied to any jobs yet.</Typography>
                            )}
                        </>
                    ) : (
                        <Typography align="center">User does not exist.</Typography>
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
                    <Dialog open={openView} onClose={handleCloseView} maxWidth="md" fullWidth>
                        <DialogTitle align='center'>Application Details</DialogTitle>
                        <DialogContent>{dialogContent}</DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleCloseView}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Grid>
        </ThemeProvider >
    );
}