import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { CssBaseline, Button, Container } from '@mui/material';

import Movies from './components/Movies';
import TopBar from './components/TopBar';
import MoviesForm from './components/MoviesForm';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [edit, setEdit] = useState(false);
    const [movieEdit, setMovieEdit] = useState({});

    const getFromServer = () => {
        axios.get('http://localhost:3001/movies').then(res => {
            setMovies(res.data.moviesList);
            setCount(res.data.moviesList.length);
        }).catch(err => {
            console.log(err);
        })
    }

    // Implement movieId parameter to display in MovieForm Component
    const toggleEdit = (movie) => {
        console.log("Toggling edit");
        setEdit((prevEdit) => {
            return !prevEdit;
        })
        setMovieEdit(movie);
        toggleForm();
    }
    
    const toggleForm = () => {
        setOpen(!open);
    }

    const incrementCount = () => {
        setCount((prevCount) => {
            prevCount++;
        })
    }

    const decrementCount = () => {
        setCount((prevCount) => {
            prevCount--;
        })
    }

    useEffect(() => {
        getFromServer();
    }, [])
    

    return (
        <CssBaseline>
            <TopBar />
            <Movies toggleEdit={toggleEdit} editStatus={edit} getFromServer={getFromServer} moviesList={movies} movieCount={count} decrementCount={decrementCount}/>
            <Container align="center" sx={{ width: 1200, marginBottom: "50px", mx: "auto" }}>
            {!edit ? <Button variant="contained" onClick={toggleForm}>
                    {open ? "Cancel" : "Add New Movie"}
                </Button> : <></>}
            </Container>
            {open ? <MoviesForm /* addMovie={addMovie} */ movieToEdit={movieEdit} toggleEdit={toggleEdit} editStatus={edit} getFromServer={getFromServer} toggleForm={toggleForm} incrementCount={incrementCount}/> : <></>}
        </CssBaseline>
    )
}

export default App;