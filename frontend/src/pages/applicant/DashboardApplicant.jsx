import * as React from 'react';
import { Typography, Box, ThemeProvider, Container, Grid } from '@mui/material';
import { theme } from '../../constants/theme'
import { JobsApplied } from "./JobsApplied"
import { ProfileApplicant } from './ProfileApplicant';
import { FindJobs } from './FindJobs';
import { DownloadCV } from './DownloadCV';
import SideBar from './DrawerListApplicant';


export default function DashboardApplicant() {
  const name = localStorage.getItem('userName');
  const [currentComponent, setCurrentComponent] = React.useState(<JobsApplied />);

  const handleProfileClick = () => {
    setCurrentComponent(<ProfileApplicant />);
  };
  const handleDashboardClick = () => {
    setCurrentComponent(<JobsApplied />);
  };
  const handleSearchClick = () => {
    setCurrentComponent(<FindJobs />);
  };
  const handleCVClick = () => {
    setCurrentComponent(<DownloadCV />);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Grid>
          <SideBar
            onDashboardClick={handleDashboardClick}
            onUpdateProfileClick={handleProfileClick}
            onSearchClick={handleSearchClick}
            onCVClick={handleCVClick}
          />
        </Grid>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Container sx={{ mt: 3 }}>
            <Typography variant="h2">
              Welcome, {name}
            </Typography>
            <Grid>
              {currentComponent}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}