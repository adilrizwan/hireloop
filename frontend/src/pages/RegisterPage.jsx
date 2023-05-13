import * as React from 'react';
import { theme } from '../constants/theme'
import { ThemeProvider, Box, Typography, Container, Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { tiers } from '../constants/texts'
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ p: 5 }} >
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Register
        </Typography>
        <Typography variant="h5" fontSize={18} align="center" color="text.secondary" component="p">
          Hireloop is a modern job search platform that simplifies the hiring process for job seekers and recruiters alike. With powerful tools and a user-friendly interface, Hireloop makes it easy to find your dream job or top talent. Register today to take your career or hiring strategy to the next level.
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ pb: 5 }} component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center', }}

                  sx={{
                    backgroundColor: theme.palette.tertiary.black
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                  </Box>
                  {tier.description.map((line) => (
                    <Typography
                      variant="subtitle1"
                      align="center"
                    >
                      {line}
                    </Typography>
                  ))}
                </CardContent>
                <CardActions>
                  <Button
                    color={tier.buttonColor}
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => {
                      if (tier.title === 'Applicant') {
                        navigate('/register/applicant')
                      }
                      else if (tier.title === 'Employer') {
                        navigate('/register/employer')
                      }
                      else {
                        navigate('/register/admin')
                      }
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}