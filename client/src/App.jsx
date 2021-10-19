import { React, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import { CssBaseline, Button, Container, AppBar, Toolbar, Typography, Box, CircularProgress } from '@mui/material';

import Movies from './components/Movies';
import TopBar from './components/TopBar';
import MoviesForm from './components/MoviesForm';
// import LoginButton from './components/LoginButton';
// import LogoutButton from './components/LogoutButton';
import LoginDisplay from './components/LoginDisplay';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [edit, setEdit] = useState(false);
    const [movieEdit, setMovieEdit] = useState({});

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const getFromServer = () => {
        axios.get('http://localhost:3001/movies').then(res => {
            setMovies(res.data.moviesList);
            setCount(res.data.moviesList.length);
        }).catch(err => {
            console.log(err);
        })
    }

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
        if (isAuthenticated) {
            getFromServer();
        }
    }, [isAuthenticated])
    

    if (isAuthenticated) {
        return (
            <CssBaseline>
                <TopBar />
                <h2>Hello {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <Movies toggleEdit={toggleEdit} editStatus={edit} getFromServer={getFromServer} moviesList={movies} movieCount={count} decrementCount={decrementCount}/>
                <Container align="center" sx={{ width: 1200, marginBottom: "50px", mx: "auto", maxWidth: "md" }}>
                {!edit ? <Button variant="contained" onClick={toggleForm}>
                        {open ? "Cancel" : "Add New Movie"}
                    </Button> : <></>}
                </Container>
                {open ? <MoviesForm /* addMovie={addMovie} */ movieToEdit={movieEdit} toggleEdit={toggleEdit} editStatus={edit} getFromServer={getFromServer} toggleForm={toggleForm} incrementCount={incrementCount}/> : <></>}
            </CssBaseline>
        )
    } else if (isLoading) {
        return (<Container align="center" sx={{ width: 1200, height: 400, marginTop: "100px", marginBottom: "50px", mx: "auto", maxWidth: "md" }}>
        <Box component="div" alignItems="center" sx={{height: 400, border: "3px solid black", borderRadius: "10px", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
            <div>
                <CircularProgress />
            </div>
        </Box>
        </Container>
        )
    } 
    else {
        return (
            <CssBaseline>
                <TopBar />
                <LoginDisplay></LoginDisplay>
            </CssBaseline>
        )
    }
}

export default App;