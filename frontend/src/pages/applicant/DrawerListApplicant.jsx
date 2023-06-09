import * as React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Toolbar, styled, ThemeProvider, useMediaQuery } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MuiDrawer from '@mui/material/Drawer';
import { theme } from "../../constants/theme"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
          <ApplicantDrawerList
            onDashboardClick={props.onDashboardClick}
            onUpdateProfileClick={props.onUpdateProfileClick}
            onSearchClick={props.onSearchClick}
            onCVClick={props.onCVClick}
          />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </ThemeProvider>
  )
}

export const ApplicantDrawerList = (props) => {
  const handleProfileClick = () => {
    props.onUpdateProfileClick();
  };
  const handleDashboardClick = () => {
    props.onDashboardClick();
  };
  const handleSearchClick = () => {
    props.onSearchClick();
  };
  const handleCVClick = () => {
    props.onCVClick();
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My Jobs" />
      </ListItemButton>
      <ListItemButton onClick={handleSearchClick}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Find Jobs" />
      </ListItemButton>
      <ListItemButton onClick={handleCVClick}>
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="Download CV" />
      </ListItemButton>
      <ListItemButton onClick={handleProfileClick}>
        <ListItemIcon>
          <EditNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItemButton>
    </React.Fragment>
  );
};