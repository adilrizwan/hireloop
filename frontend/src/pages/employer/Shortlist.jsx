import * as React from 'react';
import { ThemeProvider, Box, Grid, Paper, List, Button, ListItem, ListItemText, Pagination, Typography, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import axios from 'axios';
import { theme, pageSize } from '../../constants/theme'
import { toast } from 'react-toastify';

export default function Shortlist() {
  const [data, setData] = React.useState([]);
  const [jobDetails, setJobDetails] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [openView, setOpenView] = React.useState(false);
  const [selectedApplicant, setSelectedApplicant] = React.useState(null);
  const [dialogContent, setDialogContent] = React.useState(null);
  const [activeJob, setActiveJob] = React.useState(null);
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
        setData(response.data);
        const totalCount = parseInt((response.data.Results.split(" "))[3]);
        setTotalPages(Math.ceil(totalCount / pageSize));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, currentPage]);

  const handleDetailsClick = (job) => {
    sessionStorage.setItem("job", job.job_id)
    axios.get(`/employer/jobs/${job.job_id}`, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((response) => {
        setJobDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setActiveJob(job.job_id)
  };
  const handleViewClick = (application) => {
    setOpenView(true);
    setSelectedApplicant(application.id);
    setDialogContent(
      <>
        <Typography>First Name: {application.firstName}</Typography>
        <Typography>Last Name: {application.lastName}</Typography>
        <Typography>Date of Birth: {application.DOB.split("T")[0]}</Typography>
        <Typography>Gender: {application.gender}</Typography>
        <Typography>Highest Education: {application.highestEducation}</Typography>
        <Typography>Institution: {application.institution}</Typography>
        <Typography>Major: {application.major}</Typography>
        <Typography>Email: {application.email}</Typography>
        <Typography>Phone Number: {application.phoneNo}</Typography>
        <Typography>City: {application.city}</Typography>
        <Typography>Country: {application.country}</Typography>
        <Typography>Bio: {application.bio}</Typography>
        <Typography>Status: {application.status}</Typography>
      </>
    )
  };
  const handleStatusClick = (message) => {
    const jobID = sessionStorage.getItem("job")
    axios.post(`/employer/jobs/shortlist/${jobID}`, {
      status: message,
      appID: selectedApplicant
    }, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((response) => {
        toast.success("Success!")
        setOpenView(false)
      })
      .catch((error) => {
        toast.error('Failed: ' + error.response.data.message + '.');
        console.log(error);
      });
  };
  const handleCloseView = () => {
    setOpenView(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  mt: 3,
                  mb: 3,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '50vh',
                  overflow: 'auto'
                }}
              >
                <Typography
                  variant="h6"
                  fontSize={18}
                  align="center"
                  sx={{
                    position: 'sticky',
                    top: 0,
                  }}
                >Jobs</Typography>
                <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>{data.Results}</Typography>
                {data.Jobs && data.Jobs.length > 0 ? (
                  <List>
                    {data.Jobs && data.Jobs.map((job, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={job.title} secondary={job.employmentType}
                        />
                        <Box>
                          <Button
                            variant="contained"
                            size='small'
                            onClick={() => handleDetailsClick(job)}
                            color={activeJob === job.job_id ? "secondary" : "primary"}
                            >
                            Details
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
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  mt: 3,
                  mb: 3,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '50vh',
                  overflow: 'auto'
                }}
              >
                <Typography
                  variant="h6"
                  fontSize={18}
                  align="center"
                  sx={{
                    position: 'sticky',
                    top: 0,
                  }}
                >Job Details</Typography>
                {jobDetails && jobDetails.JobPost && jobDetails.JobPost.length !== 0 ?
                  <>
                    <Grid item>
                      <Typography variant='h6'>Title</Typography>
                      <Typography>{jobDetails.JobPost[0].title}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h6'>Employment Type</Typography>
                      <Typography>{jobDetails.JobPost[0].employmentType}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h6'>Curency</Typography>
                      <Typography>{jobDetails.JobPost[0].currency}</Typography>
                    </Grid>
                    <Grid align="left">
                      <Typography variant='h6'>Salary</Typography>
                      <Typography>{jobDetails.JobPost[0].salary}</Typography>
                    </Grid>
                    <Grid align="left">
                      <Typography variant='h6'>Location</Typography>
                      <Typography>{jobDetails.JobPost[0].location}</Typography>
                    </Grid>
                    <Grid align="left">
                      <Typography variant='h6'>Qualification</Typography>
                      <Typography>{jobDetails.JobPost[0].qualifications}</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='h6'>Experience</Typography>
                      <Typography>{jobDetails.JobPost[0].experience}</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='h6'>Deadline</Typography>
                      <Typography>{jobDetails.JobPost[0].deadline.split("T")[0]}</Typography>
                    </Grid>
                    <Grid>
                      <Typography variant='h6'>Job Description</Typography>
                      <Typography>{jobDetails.JobPost[0].jobDesc}</Typography>
                    </Grid> </> : <Typography align='center'>Nothing to show.</Typography>}
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>

        <Paper
          sx={{
            mt: 3,
            mb: 3,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            fontSize={18}
            align="center"
            sx={{
              position: 'sticky',
              top: 0,
            }}
          >Applicants</Typography>
          <Typography sx={{ mb: 1, mt: 1 }} variant='caption' fontSize={14} align='right'>Total Applicants: {jobDetails.TotalApplicants}</Typography>
          {jobDetails.Applicants && jobDetails.Applicants.length > 0 ? (
            <List>
              {jobDetails.Applicants && jobDetails.Applicants.map((job, index) => (
                <ListItem key={index}>
                  <ListItemText primary={job.firstName + " " + job.lastName} secondary={job.highestEducation}
                  />
                  <Box>
                    <Button
                      variant="contained"
                      size='small'
                      onClick={() => handleViewClick(job)}
                      color="secondary">
                      View
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography align='center'>No Applications.</Typography>
          )}
          <Dialog open={openView} onClose={handleCloseView} maxWidth="md" fullWidth>
            <DialogTitle align='center'>Applicant Details</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                size='small'
                onClick={() => handleStatusClick("Accepted")}
                color="primary">
                Accept
              </Button>
              <Button
                variant="contained"
                onClick={() => handleStatusClick("Rejected")}
                size='small'
                color="error">
                Reject
              </Button>
              <Button
                variant="contained"
                size='small'
                onClick={() => handleStatusClick("Contacted")}
                color="accent">
                Contact
              </Button>
              <Button
                onClick={handleCloseView}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}