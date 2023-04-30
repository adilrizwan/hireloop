// import * as React from 'react';
// import MuiDrawer from '@mui/material/Drawer';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import { styled, ThemeProvider } from '@mui/material/styles';
// import Toolbar from '@mui/material/Toolbar';
// import { theme } from "../constants/theme"
// import List from '@mui/material/List';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { ApplicantDrawerList } from '../pages/applicant/ApplicantDrawerList';
// import { EmployerDrawerList } from '../pages/employer/EmployerDrawerList';
// import { useMediaQuery } from '@mui/material';

// const drawerWidth = 240;
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     '& .MuiDrawer-paper': {
//       position: 'static',
//       whiteSpace: 'nowrap',
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       boxSizing: 'border-box',
//       ...(!open && {
//         overflowX: 'hidden',
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen,
//         }),
//         width: theme.spacing(7),
//         [theme.breakpoints.up('sm')]: {
//           width: theme.spacing(9),
//         },
//       }),
//     },
//   }),
// );
// export default function SideBar(user) {
//   const isScreenSmall = useMediaQuery(theme.breakpoints.down(700));
//   const [open, setOpen] = React.useState(true);

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };
//   const DrawerList = user.id.role === "APPLICANT" ? <ApplicantDrawerList /> : <EmployerDrawerList />
//   return (
//     <ThemeProvider theme={theme}>
//       <Drawer variant="permanent" open={!isScreenSmall && open}>
//         <Toolbar
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'flex-end',
//             px: [1],
//           }}
//         >
//           <IconButton onClick={toggleDrawer}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </Toolbar>
//         <Divider />
//         <List>
//           {DrawerList}
//           <Divider sx={{ my: 1 }} />
//         </List>
//       </Drawer>
//     </ThemeProvider>
//   )
// }