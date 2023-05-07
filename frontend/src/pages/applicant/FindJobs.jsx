import * as React from 'react';
import { List, Box, ListItem, ListItemText, TextField, Button, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { theme, pageSize } from '../../constants/theme'
import { toast } from 'react-toastify'
import { buttonPlacement } from '../../constants/theme';
import axios from 'axios'
import { fieldNames } from '../../constants/selectMenus';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export function FindJobs() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [inputs, setInputs] = useState([]);
    const [availableId, setavailableId] = useState([1, 3, 5, 7, 9, 11, 13, 15]);
    const [openView, setOpenView] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);
    const [openApply, setOpenApply] = React.useState(false);
    const [applyDialogContent, setApplyDialogContent] = React.useState(null);
    const [selectedJob, setSelectedJob] = React.useState(null);
    const token = localStorage.getItem('token');

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;
        setInputs(newInputs);
    };
    const handleFieldClick = async (fieldName) => {
        let field = fieldName.toLowerCase();
        if (availableId.length > 0) {
            console.log(availableId)
            const id = availableId.shift();
            const newInputs = [...inputs, { id: id, value: field }, { id: id + 1, value: "" }];
            setInputs(newInputs);
            setavailableId(availableId);
            console.log(availableId)

        } else {
            toast.error("Cannot add any more fields.");
        }
    };
    const deleteField = (id) => {
        console.log(availableId)
        const newInputs = inputs.filter((input) => input.id !== id && input.id !== id - 1);
        const deletedId = id - 1;

        if (!availableId.includes(deletedId)) {
            setavailableId([...availableId, deletedId]);
        }

        setInputs(newInputs);
        console.log(availableId)

    };

    const onSubmit = async (event, page) => {
        event.preventDefault();
        try {
            let obj = {};
            for (let i = 0; i < inputs.length; i = i + 2) {
                obj[inputs[i].value] = inputs[i + 1].value;
            }
            const response = await axios.get('/applicant/jobs/search', {
                headers: {
                    Authorization: `${token}`
                },
                params: {
                    ...obj,
                    page: page
                }
            });
            setData(response.data);
            const totalCount = parseInt((response.data.Results.split(" "))[3]);
            setTotalPages(Math.ceil(totalCount / pageSize));
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async (event, value) => {
        event.preventDefault();
        await onSubmit(event, value);
        setCurrentPage(value);
    };
    const handleViewClick = (application) => {
        setSelectedJob(application)
        // console.log(selectedJob)
        setOpenView(true);
        setDialogContent(
            <Typography>
                <Typography>Company: {application.companyName}</Typography>
                <Typography>Title: {application.title}</Typography>
                <Typography>Employment Type: {application.employmentType}</Typography>
                <Typography>Experience (years): {application.experience}</Typography>
                <Typography>Qualifications: {application.qualfications}</Typography>
                <Typography>Currency: {application.currency}</Typography>
                <Typography>Salary: {application.salary}</Typography>
                <Typography>Location: {application.location}</Typography>
                <Typography>Job Description: {application.jobDesc}</Typography>
                <Typography>Deadline: {application.deadline.split("T")[0]}</Typography>
            </Typography>
        )
    };
    const handleApplyClick = (application) => {
        setSelectedJob(application)
        setOpenApply(true);
        setApplyDialogContent(
            <Typography>
                Are you sure you want to apply to this opening?
            </Typography>
        )
    };

    const handleApply = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/applicant/apply/${selectedJob.job_id}`, 5, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            toast.success('Success!');
            setOpenApply(false);
            setOpenView(false);
        } catch (error) {
            setOpenApply(false);
            setOpenView(false);
            toast.error('Failed: ' + error.response.data.message + '.');
            console.log(error.response.request.status);
        }
    };
    const handleCloseView = () => {
        setOpenView(false);
    };
    const handleCloseApply = () => {
        setOpenApply(false);
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
                        Find Jobs
                    </Typography>
                    <Grid align='center'>
                        <Typography sx={{ mb: 1, mt: 1 }} variant="caption" fontSize={14} align="left">
                            {fieldNames.map((fieldName) => (
                                <Button
                                    key={fieldName}
                                    onClick={() => handleFieldClick(fieldName)}
                                    sx={{ mr: 1 }}
                                >
                                    {fieldName}
                                </Button>
                            ))}
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        {inputs.map((input, index) => (
                            <React.Fragment key={input.id}>
                                {index % 2 === 0 && (
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            value={input.value}
                                            variant="standard"
                                        />
                                    </Grid>
                                )}
                                {index % 2 !== 0 && (
                                    <Grid item>
                                        <TextField
                                            type="text"
                                            value={input.value}
                                            onChange={(event) => handleInputChange(index, event)}
                                            variant="standard"
                                            InputProps={{

                                                endAdornment: (
                                                    <IconButton
                                                        onClick={() => deleteField(input.id)}
                                                        sx={{ padding: 0 }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                    <Grid align='center'>
                        <Button
                            style={buttonPlacement}
                            variant="contained"
                            size='large'
                            onClick={onSubmit}
                            color="primary">
                            Search
                        </Button>
                    </Grid>
                    <Typography variant="h6" fontSize={18} align='center'>
                        Search Results
                    </Typography>
                    <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                    {data.SearchResults && data.SearchResults.length > 0 ? (
                        <List>
                            {data.SearchResults && data.SearchResults.map((result, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={result.title} secondary={result.companyName}
                                    />
                                    <Box>
                                        <Button
                                            style={{ margin: '10px' }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleViewClick(result)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            // onClick={handleApplyClick}
                                            onClick={() => handleApplyClick(result)}
                                            color="accent">
                                            Apply
                                        </Button>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography align='center'>No results found.</Typography>
                    )}
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleSearch}
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
                                // onClick={handleApplyClick}
                                onClick={() => handleApplyClick(selectedJob)}
                                color="accent">
                                Apply
                            </Button>
                            <Button
                                onClick={handleCloseView}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openApply} onClose={handleCloseApply} maxWidth="md" fullWidth>
                        <DialogTitle align='center'>Apply</DialogTitle>
                        <DialogContent>{applyDialogContent}</DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                size='small'
                                onClick={handleApply}
                                color="accent">
                                Yes, Im Sure
                            </Button>
                            <Button
                                onClick={handleCloseApply}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Grid>
        </ThemeProvider >
    );
}