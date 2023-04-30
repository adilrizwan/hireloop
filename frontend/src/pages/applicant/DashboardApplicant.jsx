import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import jwt_decode from "jwt-decode";
import { theme } from '../../constants/theme'
import { JobsApplied } from "./JobsApplied"
import ProfileApplicant from './ProfileApplicant';
import SideBar from './DrawerListApplicant';


export default function DashboardApplicant() {
  const token = localStorage.getItem('user');
  const user = jwt_decode(token);
  const name = user.name
  const [currentComponent, setCurrentComponent] = React.useState(<JobsApplied />);

  const handleProfileClick = () => {
    setCurrentComponent(<ProfileApplicant />);
  };
  const handleDashboardClick = () => {
    setCurrentComponent(<JobsApplied />);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Grid>
          <SideBar
            onDashboardClick={handleDashboardClick}
            onUpdateProfileClick={handleProfileClick}
          />
          {/* <SideBar id={user}></SideBar> */}
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