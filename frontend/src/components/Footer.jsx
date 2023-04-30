import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Link from '@mui/material/Link';
import { Box } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { theme } from '../constants/theme'
import { ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Hireloop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: theme.palette.tertiary.black,
          p: { xs: 4, md: 7 },
          pt: 12,
          pb: 12,
          fontSize: { xs: '12px', md: '14px' }
        }}
      >
        <Grid container spacing={2} justifyContent="center">

          <Grid item md={6} lg={4}>
            <Typography
              sx={{ mb: 1 }}
              variant="h3">
              About us</Typography>
            <Typography
              variant="caption2">
              Hireloop connects employers and job applicants through a user-friendly job search platform, simplifying the hiring process for both parties. Find your dream job or top talent with ease.
            </Typography>
            <Box
              sx={{
                mt: 4,
              }}
            >
              <FacebookIcon color='background' sx={{ mr: 1 }} />
              <TwitterIcon color='background' sx={{ mr: 1 }} />
              <InstagramIcon color='background' />
            </Box>
          </Grid>
          <Grid
            item md={6} lg={2}>
            <Typography variant="body2">Information</Typography>
            <List>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2">
                  Contact Us
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2">
                  Privacy &amp; Policy
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2">
                  Terms &amp; Conditions
                </Typography>
              </ListItemText>
            </List>
          </Grid>
          <Grid item md={6} lg={2}>
            <Typography variant="body2">Account</Typography>
            <List>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2">
                  Login
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2">
                  Dashboard
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2">
                  Profile
                </Typography>
              </ListItemText>
            </List>
          </Grid>
          <Grid item md={6} lg={4}>
            {/* <Typography variant="body2">Admin</Typography> */}
            <Stack>
              <Button
                onClick={() => {
                  navigate('/admin/login')
                }}
                sx={{ mt: 4, mb: 4 }}
                variant="contained"
              >
                Extranet Login
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 1 }} />
      </Box>
    </ThemeProvider>
  );
}