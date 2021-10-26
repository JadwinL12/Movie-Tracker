const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { find } = require('../models/Movie.js');

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
const List = require('../models/UserList.js');

router.use(express.json());

function findUser(userSub) {
    return List.find({ owner: userSub }).then((user) => {
        if (user.length === 0) {
            return [];
        } else {
            return user;
        }
    })
}

function checkForDuplicates(movieData, userSub, movieId = "0") {
    return findUser(userSub).then((users) => {
        const user = users[0];
        if (user.movieList.length === 0) {
            return false;
        } else {
            for (let i = 0; i < user.movieList.length; i++) {
                let movie = user.movieList[i];
                if (movie.title === movieData.title && movie.director === movieData.director && movie.id !== movieId) {
                    return true;
                }
            }
            return false;
        }
    })
}

router.get('/', checkJwt, (req, res) => {
    findUser(req.user.sub).then((user) => {
        if (user.length === 0) {
            res.status(200).json({ movieList: [] });
        } else {
            res.status(200).json({ movieList: user[0].movieList });
        }
    })
})

router.post('/', checkJwt, (req, res) => {
    findUser(req.user.sub).then((user) => {
        if (user.length === 0) {
            const newMovie = req.body;
            const newUser = {
                owner: req.user.sub,
                movieList: [newMovie]
            }
            const newPost = new List(newUser);
            newPost.save();
            res.status(200).json(newUser);
        } else {
            const userId = req.user.sub;
            const newMovie = req.body;
            checkForDuplicates(newMovie, userId).then((value) => {
                if (!value) {
                    user[0].movieList.push(newMovie);
                    List.findOneAndUpdate({ owner: userId }, user[0]).then(() => {
                        res.status(200).json(user[0]);
                    })
                } else {
                    res.status(400).json({ "Error": "There is already a movie by that name" });
                }
            })
        }
    })
})

router.delete('/:mid', checkJwt, (req, res) => {
    const listOwner = req.user.sub;
    findUser(req.user.sub).then((users) => {
        if (users.length === 0) {
            res.status(404).end();
        } else {
            const user = users[0];
            const updatedList = user.movieList.filter(movies => movies.id !== req.params.mid);
            user.movieList = updatedList;
            List.findOneAndUpdate({ owner: listOwner }, user).then(() => {
                res.status(201).end();
            })
        }
    })
})

router.put('/:mid', checkJwt, (req, res) => {
    let movieId = req.params.mid;
    let movieData = req.body;
    let listOwner = req.user.sub;
    checkForDuplicates(movieData, listOwner, movieId).then((data) => {
        if (data) {
            res.status(400).json({ Error: "This movie is already tracked." })
        }
        else {
            findUser(listOwner).then((users) => {
                const user = users[0];
                user.movieList.forEach((movie) => {
                    if (movie.id === movieId) {
                        movie.title = movieData.title;
                        movie.director = movieData.director;
                        movie.rating = movieData.rating;
                        movie.review = movieData.review;
                    }
                })
                List.findOneAndUpdate({ owner: listOwner }, user).then(() => {
                    res.status(201).end();
                })
            })
        }
    })
})

module.exports = router;