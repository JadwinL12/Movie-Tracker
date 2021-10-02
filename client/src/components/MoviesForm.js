import { React, useState } from 'react';
import { Container, Box, TextField, Grid, MenuItem, Button } from '@mui/material';

import axios from 'axios';

const MoviesForm = (props) => {

    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [rating, setRating] = useState("1");
    const [review, setReview] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleDirectorChange = (event) => {
        setDirector(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const movieData = {
            title: title,
            director: director,
            rating: rating,
            review: review
        }

        axios.post('http://localhost:3001/movies', movieData).then((res) => {
            console.log(res);
            setTitle("");
            setDirector("");
            setRating("");
            setReview("1");
    
            props.toggleForm();
            props.incrementCount();
        });

        // props.addMovie(movieData);
    }

    const ratings = ["1", "2", "3", "4", "5"];

    return (
        <Container align="center" sx={{ border: "3px solid black", borderRadius: "10px", backgroundColor: "#757575", mx: "auto", maxWidth: "sm", marginBottom: "50px" }}>
            <Box onSubmit={handleSubmit} component="form" display="flex" justifyContent="left" alignItems="left" sx={{ width: "90%", height: 300, border: "3px solid black", borderRadius: "10px", backgroundColor: "white" }}>
                <Grid container spacing={3} sx={{ height: "50%", width: "100%" }}>
                    <Grid item xs={6}>
                        <TextField id="title" value={title} label="Movie Title" variant="standard" sx={{ marginTop: "10px", width: "80%" }} onChange={handleTitleChange}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="director" value={director} label="Movie Director" variant="standard" sx={{ marginTop: "10px", width: "80%" }} onChange={handleDirectorChange}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="rating" select label="rating" value={rating} sx={{ marginTop: "10px", width: "50%" }} onChange={handleRatingChange}>
                            {ratings.map((option) => {
                                return (<MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>)
                            })}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="review" value={review} fullWidth multiline label="Your thoughts" rows={4} sx={{ width: "80%" }} onChange={handleReviewChange}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default MoviesForm;