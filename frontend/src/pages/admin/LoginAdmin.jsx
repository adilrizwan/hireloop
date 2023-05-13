import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { theme } from '../../constants/theme';
import { ThemeProvider, Avatar, Button, FormControlLabel, Checkbox, Paper, TextField, Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import secure from "../../images/secure.jpg";
import { toast } from 'react-toastify'

export default function LoginAdmin() {
  const [details, setDetails] = React.useState({
    email: "",
    password: "",
    role: "ADMIN"
  })
  const { email, password } = details
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('/admin/login', details)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.Details.firstName);
        localStorage.setItem('userRole', details.role);
        window.location.assign(`/admin/dashboard`)
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
            backgroundImage: `url(${secure})`,
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
              Admin Portal
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
                autoComplete="email"
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}

                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
                      navigate('/register')
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