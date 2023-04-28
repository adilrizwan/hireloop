import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';

export const employerDrawerList = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="My Jobs" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search Job" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Create Job" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SortIcon />
      </ListItemIcon>
      <ListItemText primary="Shortlist" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EditNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Update Profile" />
    </ListItemButton>
  </React.Fragment>
);
