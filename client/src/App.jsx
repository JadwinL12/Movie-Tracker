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

    // const addMovie = (movie) => {
    //     setMovies((prevMovies) => {
    //         return [...prevMovies, movie];
    //     });
    // }
    
    const openForm = () => {
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
        axios.get('http://localhost:3001/movies').then(res => {
            setMovies(res.data.moviesList);
            setCount(res.data.moviesList.length);
        }).catch(err => {
            console.log(err);
        })
    }, [count])
    

    return (
        <CssBaseline>
            <TopBar />
            <Movies moviesList={movies} movieCount={count} decrementCount={decrementCount}/>
            <Container align="center" sx={{ width: 1200, marginBottom: "50px", mx: "auto" }}>
                <Button variant="contained" onClick={openForm}>
                    {open ? "Cancel" : "Add New Movie"}
                </Button>
            </Container>
            {open ? <MoviesForm /* addMovie={addMovie} */ toggleForm={openForm} incrementCount={incrementCount}/> : <></>}
        </CssBaseline>
    )
}

export default App;