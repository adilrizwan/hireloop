import React from 'react'
import { theme, bgImg } from '../constants/theme'
import { ThemeProvider, Typography, Container, Grid, Button } from '@mui/material'
import home from '../images/hands2.jpg'
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const user = localStorage.getItem('userRole');
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme}>
      <Grid style={bgImg(home).background}>
        <Container sx={{ p: 5 }} >
          <Typography
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to Hireloop
          </Typography>
          <Typography variant="h5" fontSize={18} align="center" color="text.secondary" component="p">
            Hireloop is a modern job search platform that simplifies the hiring process for job seekers and recruiters alike. With powerful tools and a user-friendly interface, Hireloop makes it easy to find your dream job or top talent. Register today to take your career or hiring strategy to the next level.
          </Typography>
        </Container>
        <Grid align='center'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => {
              !user ? navigate('/login') : navigate(`/${user.toLowerCase()}/dashboard`)
            }}
          >Get Started</Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}