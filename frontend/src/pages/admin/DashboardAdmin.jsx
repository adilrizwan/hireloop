import * as React from 'react';
import { Typography, ThemeProvider, Box, Container, Grid } from '@mui/material';
import { theme } from '../../constants/theme'
import SideBar from './DrawerListAdmin';
import { BroadSearch } from './BroadSearch';
import { ApplicationLog } from './ApplicationLog';
import { AppDashboard } from './AppDashboard';


export default function DashboardAdmin() {
  const name = localStorage.getItem('userName');
  const [currentComponent, setCurrentComponent] = React.useState(<BroadSearch />);

  const handleSearchClick = () => {
    setCurrentComponent(<BroadSearch />);
  };
  const handleLogClick = () => {
    setCurrentComponent(<ApplicationLog />);
  };
  const handleApplicantClick = () => {
    setCurrentComponent(<AppDashboard />);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Grid>
          <SideBar
            onLogClick={handleLogClick}
            onSearchClick={handleSearchClick}
            onApplicantClick={handleApplicantClick}
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