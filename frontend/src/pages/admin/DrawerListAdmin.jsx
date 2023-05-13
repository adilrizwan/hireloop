import * as React from 'react';
import { List, ListItemButton, Divider, ListItemIcon, ListItemText, useMediaQuery, styled, ThemeProvider, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { theme } from "../../constants/theme"

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'static',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
export default function SideBar(props) {
  const isScreenSmall = useMediaQuery(theme.breakpoints.down(700));
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" open={!isScreenSmall && open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <AdminDrawerList
            onLogClick={props.onLogClick}
            onSearchClick={props.onSearchClick}
            onApplicantClick={props.onApplicantClick}
          />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </ThemeProvider>
  )
}

export const AdminDrawerList = (props) => {

  const handleLogClick = () => {
    props.onLogClick();
  };
  const handleSearchClick = () => {
    props.onSearchClick();
  };
  const handleApplicantClick = () => {
    props.onApplicantClick();
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleSearchClick}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search User" />
      </ListItemButton>
      <ListItemButton onClick={handleLogClick}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Application Logs" />
      </ListItemButton>
      <ListItemButton onClick={handleApplicantClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Applicant Dashboard" />
      </ListItemButton>
    </React.Fragment>
  );
};