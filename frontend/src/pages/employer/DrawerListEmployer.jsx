import * as React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { theme } from "../../constants/theme"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery } from '@mui/material';

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
          <EmployerDrawerList
            onDashboardClick={props.onDashboardClick}
            onUpdateProfileClick={props.onUpdateProfileClick}
            onCreateJobClick={props.onCreateJobClick}
            onShortlistClick={props.onShortlistClick}
          />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </ThemeProvider>
  )
}
export const EmployerDrawerList = (props) => {
  const handleProfileClick = () => {
    props.onUpdateProfileClick();
  };
  const handleDashboardClick = () => {
    props.onDashboardClick();
  };
  const handleCreateJobClick = () => {
    props.onCreateJobClick();
  };
  const handleShortlistClick = () => {
    props.onShortlistClick();
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleDashboardClick}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="My Jobs" />
      </ListItemButton>
      {/* <ListItemButton>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search Job" />
      </ListItemButton> */}
      <ListItemButton onClick={handleCreateJobClick}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Create Job" />
      </ListItemButton>
      <ListItemButton onClick={handleShortlistClick}>
        <ListItemIcon>
          <SortIcon />
        </ListItemIcon>
        <ListItemText primary="Shortlist" />
      </ListItemButton>
      <ListItemButton onClick={handleProfileClick}>
        <ListItemIcon>
          <EditNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Update Profile" />
      </ListItemButton>
    </React.Fragment>
  );
}