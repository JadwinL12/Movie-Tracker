import { React } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';

import MoviesList from './MoviesList';
import Counter from './Counter';

const Movies = (props) => {

    if (props.moviesList.length === 0) {
        return (<Container align="center" sx={{ width: 1200, height: 400, marginTop: "100px", marginBottom: "50px", mx: "auto", maxWidth: "md" }}>
            <Box component="div" alignItems="center" sx={{height: 400, border: "3px solid black", borderRadius: "10px", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
                <div>
                    <CircularProgress />
                </div>
            </Box>
        </Container>
        )
    }

    return (
        <Container align="center" sx={{ width: 1200, marginTop: "100px", marginBottom: "50px", mx: "auto", maxWidth: "md" }}>
            <Box sx={{ border: "3px solid black", borderRadius: "10px", backgroundColor: "#757575" }}>
                <Counter movieCount={props.movieCount} />
                <MoviesList movies={props.moviesList} decrementCount={props.decrementCount}/>
            </Box>
        </Container>
    )
};

export default Movies;