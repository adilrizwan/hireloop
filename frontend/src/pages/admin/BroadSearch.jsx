import * as React from 'react';
import { toast } from 'react-toastify'
import axios from 'axios'
import { ThemeProvider, Grid, Paper, Button, Pagination, Typography, TextField, List, ListItem, ListItemText, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { theme, pageSize, buttonPlacement } from '../../constants/theme'
import { appFieldNames, empFieldNames } from '../../constants/selectMenus';

export function BroadSearch() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [inputs, setInputs] = React.useState([]);
    const [availableId, setavailableId] = React.useState([1, 3, 5, 7]);
    const [selectedRole, setSelectedRole] = React.useState("APPLICANT");
    const [fieldNames, setFieldNames] = React.useState(appFieldNames);
    const [openView, setOpenView] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteDialogContent, setDeleteDialogContent] = React.useState(null);
    const [selectedJob, setSelectedJob] = React.useState(null);
    const token = localStorage.getItem('token');

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index].value = event.target.value;
        setInputs(newInputs);
    };
    const deleteField = (id) => {
        const newInputs = inputs.filter((input) => input.id !== id && input.id !== id - 1);
        const deletedId = id - 1;
        if (!availableId.includes(deletedId)) {
            setavailableId([...availableId, deletedId]);
        }
        setInputs(newInputs);
    };
    const handleViewClick = (application) => {
        setSelectedJob(application)
        setOpenView(true);
        setDialogContent(
            selectedRole === 'APPLICANT' ? (
                <>
                    <Typography>First Name: {application.firstName}</Typography>
                    <Typography>Last Name: {application.lastName}</Typography>
                    <Typography>Email: {application.email}</Typography>
                    <Typography>Gender: {application.gender}</Typography>
                    <Typography>DOB Name: {application.DOB.split("T")[0]}</Typography>
                    <Typography>Highest Education: {application.highestEducation}</Typography>
                    <Typography>Major: {application.major}</Typography>
                    <Typography>Institution: {application.institution}</Typography>
                    <Typography>Phone Number: {application.phoneNo}</Typography>
                    <Typography>City: {application.city}</Typography>
                    <Typography>Country: {application.country}</Typography>
                    <Typography>Bio: {application.bio}</Typography>
                </>
            ) : (
                <>
                    <Typography>Company Name: {application.companyName}</Typography>
                    <Typography>Email: {application.email}</Typography>
                    <Typography>Established Year: {application.estdYear}</Typography>
                    <Typography>Number of Employees: {application.noOfEmployees}</Typography>
                    <Typography>Company Type: {application.companyType}</Typography>
                    <Typography>Product Domain: {application.prodDomain}</Typography>
                    <Typography>Website: {application.website}</Typography>
                    <Typography>Phone Number: {application.phoneNo}</Typography>
                    <Typography>City: {application.hqCity}</Typography>
                    <Typography>Country: {application.hqCountry}</Typography>
                    <Typography>About: {application.about}</Typography>
                </>
            )
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
            if (selectedRole === 'APPLICANT') {
                await axios.delete(`/admin/applicant/${selectedJob.id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
            }
            else {
                await axios.delete(`/admin/employer/${selectedJob.id}`, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
            }
            toast.success('Deleted!');
            setOpenDelete(false);
            setOpenView(false);
        } catch (error) {
            setOpenDelete(false);
            setOpenView(false);
            toast.error('Failed: ' + error.response.data.message + '.');
        }
    };

    const handleCloseView = () => {
        setOpenView(false);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const onSubmit = async (event, page) => {
        event.preventDefault();
        try {
            let obj = {};
            for (let i = 0; i < inputs.length; i = i + 2) {
                obj[inputs[i].value] = inputs[i + 1].value;
            }
            const response = await axios.get('/admin/search', {
                headers: {
                    Authorization: `${token}`
                },
                params: {
                    role: selectedRole,
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

    const handleRoleSelection = (event, role) => {
        if (selectedRole !== role) {
            setSelectedRole(role);
            setFieldNames(role === "APPLICANT" ? appFieldNames : empFieldNames);
            setInputs([]);
            setCurrentPage(1)
            setavailableId([1, 3, 5, 7]);
        }
    };
    const handleFieldClick = async (field) => {
        if (availableId.length > 0) {
            const id = availableId.shift();
            const newInputs = [...inputs, { id: id, value: field }, { id: id + 1, value: "" }];
            setInputs(newInputs);
            setavailableId(availableId);

        } else {
            toast.error("Cannot add any more fields.");
        }
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
                        Search Users
                    </Typography>
                    <Grid align='center'>
                        <Button
                            sx={{ margin: "15px 15px" }}
                            size="large"
                            onClick={(event) => handleRoleSelection(event, 'APPLICANT')}
                            color='primary'
                            variant={selectedRole === 'APPLICANT' ? 'contained' : 'outlined'}
                        >
                            Applicant
                        </Button>

                        <Button
                            sx={{ margin: "15px 15px" }}
                            size="large"
                            onClick={(event) => handleRoleSelection(event, 'EMPLOYER')}
                            color='primary'
                            variant={selectedRole === 'EMPLOYER' ? 'contained' : 'outlined'}
                        >
                            Employer
                        </Button>

                    </Grid>
                    <Grid align='center'>
                        <Typography sx={{ mb: 1, mt: 1 }} variant="caption" fontSize={14} align="left">
                            {fieldNames.map((fieldName) => (
                                <Button
                                    key={fieldName}
                                    onClick={() => handleFieldClick(fieldName)}
                                    sx={{ mr: 1, mb: 2 }}
                                >
                                    {fieldName}
                                </Button>
                            ))}
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        {inputs.length > 0 && inputs.map((input, index) => (
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
                            endIcon={<SearchIcon></SearchIcon>}
                            color="primary">
                            Search
                        </Button>
                    </Grid>
                    <Typography variant="h6" fontSize={18} align='center'>
                        Search Results
                    </Typography>
                    <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                    {data.Records && data.Records.length > 0 ? (
                        <List>
                            {data.Records && data.Records.map((result, index) => (
                                <ListItem key={index}>
                                    {selectedRole === "APPLICANT" ? <ListItemText primary={result.firstName + " " + result.lastName} secondary={result.email}
                                    /> : <ListItemText primary={result.companyName} secondary={result.email}
                                    />}
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
                                            onClick={() => handleDeleteClick(result)}
                                            endIcon={<DeleteIcon />}
                                            color="error">
                                            Delete
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
        </ThemeProvider >
    );
}