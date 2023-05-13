import * as React from 'react';
import { ThemeProvider, Box, List, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper, Button, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'
import { theme, pageSize } from '../../constants/theme'

export function JobsPosted() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [openView, setOpenView] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteDialogContent, setDeleteDialogContent] = React.useState(null);
    const [selectedJob, setSelectedJob] = React.useState(null);

    const token = localStorage.getItem('token');
    React.useEffect(() => {
        axios.get('/employer/dashboard', {
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

    const handleViewClick = (application) => {
        setSelectedJob(application)
        setOpenView(true);
        setDialogContent(
            <>
                <Typography>Title: {application.title}</Typography>
                <Typography>Employment Type: {application.employmentType}</Typography>
                <Typography>Experience (years): {application.experience}</Typography>
                <Typography>Qualifications: {application.qualfications}</Typography>
                <Typography>Currency: {application.currency}</Typography>
                <Typography>Salary: {application.salary}</Typography>
                <Typography>Location: {application.location}</Typography>
                <Typography>Job Description: {application.jobDesc}</Typography>
                <Typography>Date Created: {application.dateCreated.split("T")[0]}</Typography>
                <Typography>Deadline: {application.deadline.split("T")[0]}</Typography>
            </>

        )
    };
    const handleDeleteClick = (application) => {
        setSelectedJob(application)
        setOpenDelete(true);
        setDeleteDialogContent(
            <Typography>
                Are you sure you want to delete this opening?
            </Typography>
        )
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`/employer/jobs/${selectedJob.job_id}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            toast.success('Deleted!');
            setOpenDelete(false);
            setOpenView(false);
        } catch (error) {
            setOpenDelete(false);
            setOpenView(false);
            toast.error('Failed: ' + error.response.data.message + '.');
            console.log(error);
        }
    };

    const handleCloseView = () => {
        setOpenView(false);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
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
                        Jobs Posted
                    </Typography>
                    <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                    {data.Jobs && data.Jobs.length > 0 ? (
                        <List>
                            {data.Jobs && data.Jobs.map((job, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={job.title} secondary={job.employmentType}
                                    />
                                    <Box>
                                        <Button
                                            style={{ margin: '10px' }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleViewClick(job)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleDeleteClick(job)}
                                            color="error"
                                            endIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography align='center'>You have not posted any jobs yet.</Typography>
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
                        <DialogTitle align='center'>Job Details</DialogTitle>
                        <DialogContent>{dialogContent}</DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                size='small'
                                onClick={() => handleDeleteClick(selectedJob)}
                                endIcon={<DeleteIcon />}
                                color="error"
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={handleCloseView}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openDelete} onClose={handleCloseDelete} maxWidth="md" fullWidth>
                        <DialogTitle align='center'>Delete</DialogTitle>
                        <DialogContent>{deleteDialogContent}</DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                size='small'
                                onClick={handleDelete}
                                color="error">
                                Yes, I'm Sure
                            </Button>
                            <Button
                                onClick={handleCloseDelete}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Grid>
        </ThemeProvider>
    );
}