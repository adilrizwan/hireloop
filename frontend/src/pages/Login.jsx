import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import login from "../images/login.jpg";
import { theme } from '../constants/theme';
import { ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function SignInSide() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    role: ""
  })
  const { email, password, role } = details
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "role") {
      setDetails((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setDetails((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('login', details)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        details.role.toUpperCase() === 'APPLICANT' ? localStorage.setItem('userName', response.data.Details.firstName) 
        : localStorage.setItem('userName', response.data.Details.companyName);
        localStorage.setItem('userRole', details.role.toUpperCase())
        window.location.assign(`/${role.toLowerCase()}/dashboard`)

      })
      .catch((error) => {
        if (error.response.request.status === 401) {
          toast.warn("Invalid Credentials")
        } else {
          toast.error("Login failed: " + error.response.data.message)
          console.log(error)
        }
      })
  };
  const handlePasswordClick = () => {
    toast.success("A password recovery email has been sent to your registered account.")
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${login})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'error.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h2">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                onChange={handleChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid>
                <RadioGroup
                  required
                  row
                  name="role"
                  value={role}
                  onChange={handleChange}
                >
                  <FormControlLabel sx={{ margin: 'auto' }} value='Applicant' control={<Radio />} label="Applicant" />
                  <FormControlLabel sx={{ margin: 'auto' }} value='Employer' control={<Radio />} label="Employer" />
                </RadioGroup>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    variant='subtitle2'
                    onClick={handlePasswordClick}>
                    Forgot Password?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                    variant='subtitle2'
                    onClick={() => {
                      window.location.assign('/register')
                    }}
                  >
                    Don't have an account? Sign Up
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}