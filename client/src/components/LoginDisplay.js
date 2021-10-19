import React from 'react';
import { CssBaseline, Box, Container, Typography } from '@mui/material';

const LoginDisplay = () => {
    return (
        <CssBaseline>
            <Container maxWidth="md">
                <Box justifyContent="center" sx={{marginTop: 20}}>
                    <Typography align="center" variant="h2" gutterBottom>WELCOME TO MOVIE TRACKER</Typography>
                    <Typography align="center" variant="h4" sx={{marginTop: 15}}>This site lets you keep track of movies that you've watched.  Don't forget to rate and review them too!  To get started, log in at the top right.</Typography>
                </Box>
            </Container>
        </CssBaseline>
    )
}

export default LoginDisplay;