const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.js');

router.use(express.json());

function checkForDuplicates(movieData, movieId = "0") {
    return Movie.find({ title: movieData.title, director: movieData.director}).then(movie => {
        if (movie.length >= 1 && movieId === "0") {
            return true;
        } else if (movie.length >= 1 && movie[0]._id !== movieId) {
            return true;
        }
        return false;
    })
}

router.get('/', (req, res) => {
    Movie.find({}).then(movies => {
        res.status(200).json({ moviesList: movies});
    })
})

router.post('/', (req, res) => {
    let newMovie = req.body;
    const newPost = new Movie(newMovie);
    checkForDuplicates(newMovie).then((data) => {
        if (data) {
            res.status(400).json({ Error: "This movie already exists"});
        } else {
            newPost.save();
            res.status(201).end();
        }
    })
})

router.delete('/:mid', (req, res) => {
    let movieData = req.params.mid;
    Movie.findByIdAndDelete(movieData).then(() => {
        res.status(204).end();
    });
})

// Finish implementing error check
router.put('/:mid', (req, res) => {
    let movieId = req.params.mid;
    let  movieData = req.body;
    checkForDuplicates(movieData, movieId).then((data) => {
        console.log(data);
        res.end();
    })
    // Movie.findByIdAndUpdate(movieId, movieData).then(() => {
    //     res.status(204).end();
    // })
})

module.exports = router;