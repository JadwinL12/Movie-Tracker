import { React } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material"
import { styled } from '@mui/system';
import { ExpandMore } from '@mui/icons-material/';
import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';

const ContainerDiv = styled('div')({
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%"
})

const MoviesList = props => {

    const { getAccessTokenSilently } = useAuth0();

    const deleteMovie = async (movieId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.delete(`http://localhost:3001/movies/${movieId}`, { headers: { 'Authorization' : `Bearer ${accessToken}`}});
            props.decrementCount();
            props.getFromServer();
        } catch (e) {
            console.log(e.message);
        }
        // axios.delete(`http://localhost:3001/movies/${movieId}`).then((res) => {
        //     props.decrementCount();
        //     props.getFromServer();
        // })
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
                                <Typography align="left" variant="subtitle1" sx={{ mx: "auto", width: 300 }}>Directed by {movie.director}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>You said: {<b>"{movie.review}"</b>}</Typography>
                                <Typography>Your rating: {<b>{movie.rating}/5</b>}</Typography>
                                <Button variant="standard" sx={{marginRight: "10px"}} onClick={() => props.toggleEdit(movie)}>{!props.editStatus ? "Edit" : "Cancel Edit"}</Button>
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