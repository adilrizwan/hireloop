import React from 'react'
import { theme, bgImg } from '../constants/theme'
import { useState } from "react";
import { ThemeProvider } from '@emotion/react'
import { Typography, IconButton } from '@mui/material'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import home from '../images/hands2.jpg'

function Homepage() {
  const [search, setSearch] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitting search: ${search}`);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
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
          <Grid style={{ margin: "20px auto" }} align='center'>
            <form onSubmit={handleSubmit}>
              <TextField
                color="primary"
                value={search}

                onChange={handleSearchChange}
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 50
                  }, width: 300
                }}
                placeholder='Search'
                InputProps={{
                  endAdornment: (
                      <IconButton color='black' type="button"aria-label="search" onClick={handleSubmit}>
                        <SearchIcon />
                      </IconButton>
                  ),
                }}
                variant="outlined"
              />
            </form>
          </Grid>
        </Container>
      </Grid>
    </ThemeProvider>
  )
}

export default Homepage