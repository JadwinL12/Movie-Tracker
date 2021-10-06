import { React, useState } from 'react';
import { Container, Box, TextField, Grid, MenuItem, Button, Typography } from '@mui/material';

import axios from 'axios';

const MoviesForm = (props) => {

    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [rating, setRating] = useState("1");
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({title: true, director: true, review: true});

    const handleTitleChange = (event) => {
        if (event.target.value.trim().length === 0) {
            setErrors(prevErrors => ({...prevErrors, title: true}))
        } else if(errors.title === true) {
            setErrors(prevErrors => ({...prevErrors, title: false}))
        }
        setTitle(event.target.value);
    }

    const handleDirectorChange = (event) => {
        if (event.target.value.trim().length === 0) {
            setErrors(prevErrors => ({...prevErrors, director: true}))
        } else if (errors.director === true) {
            setErrors(prevErrors => ({...prevErrors, director: false}))
        }
        setDirector(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    const handleReviewChange = (event) => {
        if (event.target.value.trim().length === 0) {
            setErrors(prevErrors => ({...prevErrors, review: true}))
        } else if (errors.review === true) {
            setErrors(prevErrors => ({...prevErrors, review: false}))
        }
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
            setTitle("");
            setDirector("");
            setRating("");
            setReview("1");
    
            props.toggleForm();
            props.incrementCount();
            props.getFromServer();
        });

    }

    const ratings = ["1", "2", "3", "4", "5"];

    return (
        <Container align="center" sx={{ border: "3px solid black", borderRadius: "10px", backgroundColor: "#757575", mx: "auto", maxWidth: "sm", marginBottom: "50px" }}>
            <Box onSubmit={handleSubmit} component="form" display="flex" justifyContent="left" alignItems="left" sx={{ width: "90%", height: 400, border: "3px solid black", borderRadius: "10px", backgroundColor: "white" }}>
                <Grid container spacing={4} sx={{ height: "50%", width: "100%" }}>
                    <Grid item xs={12}>
                        <Typography sx={{marginTop: "20px"}}>All Fields Must Be Filled Out To Submit</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="title" /* error={errors.title} */ value={title} label="Movie Title" variant="standard" sx={{width: "80%" }} onChange={handleTitleChange}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="director" /* error={errors.director} */ value={director} label="Movie Director" variant="standard" sx={{width: "80%" }} onChange={handleDirectorChange}></TextField>
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
                        <TextField id="review" /* error={errors.review} */ value={review} fullWidth multiline label="Your thoughts" rows={4} sx={{ width: "80%" }} onChange={handleReviewChange}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" disabled={errors.title || errors.director || errors.review}>Submit</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default MoviesForm;