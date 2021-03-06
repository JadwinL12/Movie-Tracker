import { React, useState, useEffect } from 'react';
import { Container, Box, TextField, Grid, MenuItem, Button, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const MoviesForm = (props) => {

    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [rating, setRating] = useState("1");
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({ title: true, director: true, review: true });

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (props.editStatus) {
            setErrors({
                title: false,
                director: false,
                review: false
            })
            setTitle(props.movieToEdit.title);
            setDirector(props.movieToEdit.director);
            setRating(props.movieToEdit.rating);
            setReview(props.movieToEdit.review);
        }
    }, [])

    const handleTitleChange = (event) => {
        if (event.target.value.trim().length === 0) {
            setErrors(prevErrors => ({ ...prevErrors, title: true }))
        } else if (errors.title === true) {
            setErrors(prevErrors => ({ ...prevErrors, title: false }))
        }
        setTitle(event.target.value);
    }

    const handleDirectorChange = (event) => {
        if (event.target.value.trim().length === 0) {
            setErrors(prevErrors => ({ ...prevErrors, director: true }))
        } else if (errors.director === true) {
            setErrors(prevErrors => ({ ...prevErrors, director: false }))
        }
        setDirector(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    const handleReviewChange = (event) => {
        if (event.target.value.trim().length === 0) {
            setErrors(prevErrors => ({ ...prevErrors, review: true }))
        } else if (errors.review === true) {
            setErrors(prevErrors => ({ ...prevErrors, review: false }))
        }
        setReview(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const movieData = {
            title: title,
            director: director,
            rating: rating,
            review: review
        }
        try {
            const accessToken = await getAccessTokenSilently();
            await axios.post('http://localhost:3001/movies', movieData, { headers: { 'Authorization': `Bearer ${accessToken}` } });
            setTitle("");
            setDirector("");
            setRating("");
            setReview("1");

            props.toggleForm();
            props.incrementCount();
            props.getFromServer();
        } catch (e) {
            console.log(e.message);
        }
    }

    const handleEdit = async (event) => {
        event.preventDefault();

        const movieData = {
            title: title,
            director: director,
            rating: rating,
            review: review
        }
        try {
            const accessToken = await getAccessTokenSilently();
            console.log(props.movieToEdit._id);
            await axios.put(`http://localhost:3001/movies/${props.movieToEdit._id}`, movieData, { headers: { 'Authorization': `Bearer ${accessToken}` } });
            setTitle("");
            setDirector("");
            setRating("");
            setReview("1");

            props.toggleForm();
            props.getFromServer();
            props.toggleEdit();
        } catch (e) {
            console.log(e.message);
        }
    }

    const ratings = ["1", "2", "3", "4", "5"];

    return (
        <Container align="center" sx={{ border: "3px solid black", borderRadius: "10px", backgroundColor: "#757575", mx: "auto", maxWidth: "sm", marginBottom: "50px" }}>
            <Box onSubmit={!props.editStatus ? handleSubmit : handleEdit} component="form" display="flex" justifyContent="left" alignItems="left" sx={{ width: "90%", height: 400, border: "3px solid black", borderRadius: "10px", backgroundColor: "white" }}>
                <Grid container spacing={4} sx={{ height: "50%", width: "100%" }}>
                    <Grid item xs={12}>
                        <Typography sx={{ marginTop: "20px" }}>All Fields Must Be Filled Out To Submit</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="title" /* error={errors.title} */ value={title} label="Movie Title" variant="standard" sx={{ width: "80%" }} onChange={handleTitleChange}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="director" /* error={errors.director} */ value={director} label="Movie Director" variant="standard" sx={{ width: "80%" }} onChange={handleDirectorChange}></TextField>
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