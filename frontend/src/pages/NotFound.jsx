import React from 'react'
import { theme } from '../constants/theme'
import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
// import nikal from '../images/nikal.jpg'
// import area from '../images/area.png'
// import nasa from '../images/nasa.png'
import waldo from '../images/waldo.png'

function NotFound() {
  const num = Math.floor(Math.random() * 7) + 1;
  let imageSrc;
  if (num === 1) {
    imageSrc = "Ah, you've found me amidst this chaotic world. But beware, for curiosity may lead you into unexpected adventures. Are you ready to unravel the mysteries that lie ahead?";
  } else if (num === 2) {
    imageSrc = "Lost in a sea of faces, you've finally tracked me down. But remember, the search is never truly over. Stay sharp, my friend.";
  } else if (num === 3) {
    imageSrc = "Congratulations on finding me, but be warned, this is where the hunt ends and the game begins. Prepare yourself for the unexpected!";
  } else if (num === 4) {
    imageSrc = "You've ventured too close, seeker. Retreat now, or suffer the consequences of unveiling my hidden sanctuary."
  } else if (num === 5) {
    imageSrc = "Forget our encounter, for silence is your protection. Share not my whereabouts, or face the dire consequences. Return now, and remember: you saw nothing."
  } else if (num === 6) {
    imageSrc = "Turn back now, dear wanderer. Avert your gaze from what lies ahead. Consider it a kind gesture, for some paths are best left unexplored."
  } else if (num === 7) {
    imageSrc = "You've come to the wrong neighborhood, my friend. Turn around and walk away before things get ugly."
  } else {
    imageSrc = "You shouldn't have come this far to find me... now face the consequences!";
  }
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ p: 5 }}>
        <Typography variant="h3" align="center" color="text.primary" sx={{ mt: 5, mb: 1 }}>
          404
        </Typography>
        <Typography variant="h4" align="center" color="text.primary" sx={{ mb: 1 }}>
          <del>Waldo</del> Page not found
        </Typography>

        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <img src={waldo} alt="404" style={{ width: '100%', height: 'auto' }} />
          </Grid>
        </Grid>
        <Typography variant="h6" align="center" color="text.primary" sx={{ mt: 1 }}>
          {`"${imageSrc}"`}
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

export default NotFound
