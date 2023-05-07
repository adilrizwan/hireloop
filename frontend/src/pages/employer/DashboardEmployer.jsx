import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { theme } from '../../constants/theme'
import { JobsPosted } from "./JobsPosted"
import ProfileEmployer from './ProfileEmployer';
import SideBar from './DrawerListEmployer';
import CreateJob from './CreateJob';
import Shortlist from './Shortlist';

export default function DashboardEmployer() {
  const name = localStorage.getItem('userName');
  const [currentComponent, setCurrentComponent] = React.useState(<JobsPosted />);

  const handleProfileClick = () => {
    setCurrentComponent(<ProfileEmployer />);
  };
  const handleDashboardClick = () => {
    setCurrentComponent(<JobsPosted />);
  };
  const handleCreateJobClick = () => {
    setCurrentComponent(<CreateJob />);
  };
  const handleShortlistClick = () => {
    setCurrentComponent(<Shortlist />);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Grid>
          <SideBar
            onDashboardClick={handleDashboardClick}
            onUpdateProfileClick={handleProfileClick}
            onCreateJobClick={handleCreateJobClick}
            onShortlistClick={handleShortlistClick}
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