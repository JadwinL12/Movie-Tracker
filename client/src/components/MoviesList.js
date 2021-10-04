import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material"
import { styled } from '@mui/system';
import { ExpandMore } from '@mui/icons-material/';

import axios from 'axios';

const ContainerDiv = styled('div')({
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%"
})

const MoviesList = props => {

    const deleteMovie = (movieId) => {
        axios.delete('http://localhost:3001/movies', { data: { id: movieId}}).then((res) => {
            props.decrementCount();
        })
    }

    const movieList = props.movies;

    return (
        <ContainerDiv>
            <div>
                {movieList.map((movie) => {
                    return (
                        <Accordion key={movie._id}>
                            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1bh-content">
                                <Typography variant="h6" align="left" sx={{ flexShrink: 0, width: "33%" }}>{movie.title}</Typography>
                                <Typography align="left" variant="subtitle1" sx={{ mx: "auto", width: 200 }}>Directed by {movie.director}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>You said: {<b>"{movie.review}"</b>}</Typography>
                                <Typography>Your rating: {<b>{movie.rating}/5</b>}</Typography>
                                <Button variant="standard" sx={{marginRight: "10px"}}>Edit</Button>
                                <Button variant="contained" color="error" sx={{marginTop: "10px", marginBottom: "5px"}} onClick={() => {
                                    deleteMovie(movie._id);
                                }}>Delete</Button>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </ContainerDiv>
    )
}

export default MoviesList;