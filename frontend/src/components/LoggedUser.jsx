import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../logo.svg"
import { settings } from "../constants/selectMenus"
import { theme } from "../constants/theme"
import { ThemeProvider } from '@emotion/react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function LoggedUser({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        navigate('/')
        setAnchorElUser(null);
    };
    const handleDashboard = () => {
        navigate(`/${user.role.toLowerCase()}/dashboard`)
        setAnchorElUser(null);
    };
    const user = jwtDecode(localStorage.getItem('user'))

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
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar  />
                                    {/* <Avatar alt={user.name} src="/nonexistentimg.jpg"/>                                 */}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : setting === 'Dashboard' ? handleDashboard : handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default LoggedUser;


