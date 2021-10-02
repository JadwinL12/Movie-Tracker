import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Counter = (props) => {
    return (
        <Container align="center" sx={{mx: "auto", maxWidth: "sm", marginTop: "50px" }}>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: "30%", height: 50, border: "3px solid black", borderRadius: "10px", backgroundColor: "white" }}>
                <Typography alignItems="center">You have watched {<b>{props.movieCount}</b>} movies so far</Typography>
            </Box>
        </Container>
    )
}

export default Counter;