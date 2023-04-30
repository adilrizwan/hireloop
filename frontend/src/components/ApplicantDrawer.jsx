import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DownloadIcon from '@mui/icons-material/Download';

export const applicantDrawerList = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Find Job" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <DownloadIcon />
      </ListItemIcon>
      <ListItemText primary="Download CV" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EditNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Update Profile" />
    </ListItemButton>
  </React.Fragment>
);