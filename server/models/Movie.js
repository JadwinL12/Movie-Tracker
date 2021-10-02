const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    review: String,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;