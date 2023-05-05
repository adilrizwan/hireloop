import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import { theme, pageSize } from '../../constants/theme'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export function JobsApplied() {
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(1);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [openView, setOpenView] = React.useState(false);
    // const [openDelete, setOpenDelete] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState(null);
    // const [deleteDialogContent, setDeleteDialogContent] = React.useState(null);
    // const [deleteConfirm, setDeleteConfirm] = React.useState(false);
    const token = localStorage.getItem('user');

    React.useEffect(() => {
        axios.get('/applicant/dashboard', {
            headers: {
                Authorization: `${token}`,
            },
            params: {
                page: currentPage,
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
    }, [token, currentPage]);

    const handleViewClick = (application) => {
        setOpenView(true);
        setDialogContent(
            <Typography>
                <Grid>
                    <div>Company: {application.companyName}</div>
                    <div>Title: {application.title}</div>
                    <div>Employment Type: {application.employmentType}</div>
                    <div>Experience (years): {application.experience}</div>
                    <div>Qualifications: {application.qualfications}</div>
                    <div>Currency: {application.currency}</div>
                    <div>Salary: {application.salary}</div>
                    <div>Location: {application.location}</div>
                    <div>Job Description: {application.jobDesc}</div>
                    <div>Status: {application.status}</div>
                </Grid>
            </Typography>
        )
    };
    // const handleDeleteClick = () => {
    //     setOpenDelete(true);
    //     setDeleteDialogContent(
    //         <Typography>
    //             <div>
    //                 Are you sure you want to withdraw your application from this opening?
    //             </div>
    //         </Typography>
    //     )
    // };

    // const handleDelete = () => {
    //     axios.get('/applicant/dashboard', {
    //         headers: {
    //             Authorization: `${token}`,
    //         },
    //     })
    //         .then(() => {
    //             toast.success("Application withdrawn successfully!")
    //             setOpenDelete(false);
    //             setOpenView(false);
    //         })
    //         .catch((error) => {
    //             toast.error("Withdrawl failed: " + error.response.data.message + ".")
    //             console.log(error);
    //         });
    // };
    const handleCloseView = () => {
        setOpenView(false);
    };
    // const handleCloseDelete = () => {
    //     setOpenDelete(false);
    // };

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
                            {data.Applications.map((application, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={application.companyName} secondary={application.title} />
                                    <Typography variant="h6" fontSize={15} sx={{ color: application.status === 'REJECTED' ? theme.palette.error.main : application.status === 'ACCEPTED' ? theme.palette.secondary.main : theme.palette.accent.main, mr: '15px' }}>
                                        {application.status}
                                    </Typography>
                                    <Box>
                                        <Button
                                            style={{ margin: '10px' }}
                                            variant="contained"
                                            size="small"
                                            color="secondary"
                                            onClick={() => handleViewClick(application)}
                                        >
                                            View
                                        </Button>
                                        {/* <Button
                                            variant="contained"
                                            size='small'
                                            onClick={handleDeleteClick}
                                            color="error">
                                            Delete
                                        </Button> */}
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography align="center">You have not applied to any jobs yet.</Typography>
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
                    <Dialog open={openView} onClose={handleCloseView}>
                        <DialogTitle align='center'>Application Details</DialogTitle>
                        <DialogContent>{dialogContent}</DialogContent>
                        <DialogActions>
                            {/* <Button
                                variant="contained"
                                size='small'
                                onClick={handleDeleteClick}
                                color="error">
                                Delete
                            </Button> */}
                            <Button
                                onClick={handleCloseView}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* <Dialog open={openDelete} onClose={handleCloseDelete}>
                        <DialogTitle align='center'>Delete Application</DialogTitle>
                        <DialogContent>{deleteDialogContent}</DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                size='small'
                                onClick={handleDelete}
                                color="error">
                                Delete
                            </Button>
                            <Button
                                onClick={handleCloseDelete}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </Paper>
            </Grid>
        </ThemeProvider >
    );
}

// export function JobsApplied() {
//     const [data, setData] = React.useState([]);
//     const [totalPages, setTotalPages] = React.useState(1);
//     const [currentPage, setCurrentPage] = React.useState(1);
//     const token = localStorage.getItem('user');
//     React.useEffect(() => {
//         axios.get('/applicant/dashboard', {
//             headers: {
//                 Authorization: `${token}`
//             },
//             params: {
//                 page: currentPage
//             }
//         })
//             .then((response) => {
//                 setData(response.data)
//                 const totalCount = parseInt((response.data.Results.split(" "))[3])
//                 setTotalPages(Math.ceil(totalCount / pageSize))
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }, [token, currentPage]);

//     return (
//         <ThemeProvider theme={theme}>
//             <Grid item xs={12}>
//                 <Paper
//                     sx={{
//                         mt: 3,
//                         mb: 3,
//                         p: 2,
//                         display: 'flex',
//                         flexDirection: 'column',
//                     }}
//                 >
                    // <Typography variant="h6" fontSize={18} align='center'>
                    //     Jobs Applied
                    // </Typography>
                    // <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
//                     {data.Applications && data.Applications.length > 0 ? (
//                         <List>
//                             {data.Applications && data.Applications.map((application, index) => (
//                                 <ListItem key={index}>
//                                     <ListItemText primary={application.companyName} secondary={application.title}
//                                     />
                                    // <Typography variant="h6" fontSize={15} sx={{ color: application.status === 'REJECTED' ? theme.palette.error.main : application.status === 'ACCEPTED' ? theme.palette.secondary.main : theme.palette.accent.main, mr: '15px' }}>
                                    //     {application.status}
                                    // </Typography>
//                                     <Box>
//                                         <Button
//                                             style={{ margin: "10px" }}
//                                             variant="contained"
//                                             size='small'
//                                             color="secondary">
//                                             View
//                                         </Button>
                                        // <Button
                                        //     variant="contained"
                                        //     size='small'
                                        //     color="error">
                                        //     Delete
                                        // </Button>
//                                     </Box>
//                                 </ListItem>
//                             ))}
//                         </List>
//                     ) : (
//                         <Typography align='center'>You have not applied to any jobs yet.</Typography>
//                     )}
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={(event, value) => setCurrentPage(value)}
//                         color="primary"
//                         sx={{
//                             marginTop: 'auto',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             '& .Mui-selected': {
//                                 color: 'primary.main',
//                             },
//                         }}
//                     />
//                 </Paper>
//             </Grid>
//         </ThemeProvider>
//     );
// }