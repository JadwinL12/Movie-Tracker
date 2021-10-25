const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    owner: String,
    movieList: [
        {
            title: String,
            director: String,
            review: String,
            rating: String
        }
    ]
});

const List = mongoose.model('List', movieSchema);

module.exports = List;