const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie.js');

router.use(express.json());

router.get('/', (req, res) => {
    Movie.find({}).then(movies => {
        res.status(200).json({ moviesList: movies});
    })
})

router.post('/', (req, res) => {
    let newMovie = req.body;
    const newPost = new Movie(newMovie);
    newPost.save();
    res.status(201).end();
})

router.delete('/:mid', (req, res) => {
    let movieData = req.params.mid;
    Movie.findByIdAndDelete(movieData).then(() => {
        res.status(204).end();
    });
})

router.put('/:mid', (req, res) => {
    let movieId = req.params.mid;
    let  movieData = req.body;
    Movie.findByIdAndUpdate(movieId, movieData).then(() => {
        res.status(204).end();
    })
})

module.exports = router;