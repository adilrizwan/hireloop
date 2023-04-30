import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logo from "../logo.svg"
import { theme } from "../constants/theme"
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

function GuestUser({ setIsAuthenticated }) {
  // setIsAuthenticated(false)
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        color='inherit'
        title='hireloop'
        position="sticky"
        style={{ marginBottom: '5px' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                display="flex"
                sx={{ height: 64, cursor: 'pointer', mr: 1 }}
                alt="Hireloop Logo"
                src={Logo}
                onClick={handleLogoClick}
              />
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
            </Box>
            <Box>
              <Button
                style={{ margin: "10px" }}
                variant="contained"
                size='small'
                onClick={handleLoginClick}
                color="primary">
                Login
              </Button>
              <Button
                variant="contained"
                onClick={handleRegisterClick}
                size='small'
                color="secondary">
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default GuestUser;


