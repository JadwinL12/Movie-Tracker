const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const issuer = process.env.AUTH0_ISSUER;
const audience = process.env.AUTH0_AUDIENCE;
const uri = process.env.AUTH0_URI;

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-fkp-4g1q.us.auth0.com/.well-known/jwks.json`
    }),
    audience: audience,
    issuer: issuer,
    algorithms: ['RS256']
})

const Movie = require('../models/Movie.js');

router.use(express.json());

function checkForDuplicates(movieData, movieId = "0") {
    return Movie.find({ title: movieData.title, director: movieData.director}).then(movie => {
        if (movie.length >= 1 && movieId === "0") {
            return true;
        } else if (movie.length >= 1 && movie[0].id !== movieId) {
            return true;
        }
        return false;
    })
}

router.get('/', checkJwt, (req, res) => {
    console.log(req.user);
    Movie.find({}).then(movies => {
        res.status(200).json({ moviesList: movies});
    })
})

router.post('/', checkJwt, (req, res) => {
    let newMovie = req.body;
    const newPost = new Movie(newMovie);
    checkForDuplicates(newMovie).then((data) => {
        if (data) {
            res.status(400).json({ Error: "This movie is already tracked."});
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

router.put('/:mid', (req, res) => {
    let movieId = req.params.mid;
    let  movieData = req.body;
    checkForDuplicates(movieData, movieId).then((data) => {
        if (data) {
            res.status(400).json({ Error: "This movie is already tracked."})
        }
        else {
            Movie.findByIdAndUpdate(movieId, movieData).then(() => {
                res.status(204).end();
            })
        }
    })
})

module.exports = router;