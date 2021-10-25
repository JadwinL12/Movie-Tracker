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
    return List.find({owner: userSub}).then((user) => {
        if (user.length === 0) {
            return [];
        } else {
            return user;
        }
    })
}

function checkForDuplicates(movieData, movieId = "0", userSub) {
    // return Movie.find({ title: movieData.title, director: movieData.director}).then(movie => {
    //     if (movie.length >= 1 && movieId === "0") {
    //         return true;
    //     } else if (movie.length >= 1 && movie[0].id !== movieId) {
    //         return true;
    //     }
    //     return false;
    // })
    // return findUser(userSub).then((user) => {
    //     if (user.length === 0) {
    //         return false;
    //     } else {
    //         user[0].movieList.forEach((movies))
    //     }
    // })
}

// router.get('/', checkJwt, (req, res) => {
//     Movie.find({}).then(movies => {
//         res.status(200).json({ moviesList: movies});
//     })
// })

router.get('/', checkJwt, (req, res) => {
    // List.find({}).then(user => {
    //     if (user.length === 0 || user.movieList.length === 0) {
    //         res.status(200).json({ moviesList: []});
    //     } else {
    //         res.status(200).json({ moviesList: user.movieList});
    //     }
    // })
    findUser(req.user.sub).then((user) => {
        if (user.length === 0) {
            res.status(200).json({ movieList: []});
        } else {
            res.status(200).json({ movieList: user[0].movieList});
        }
    })
})

// router.post('/', checkJwt, (req, res) => {
//     let newMovie = req.body;
//     const newPost = new Movie(newMovie);
//     checkForDuplicates(newMovie).then((data) => {
//         if (data) {
//             res.status(400).json({ Error: "This movie is already tracked."});
//         } else {
//             newPost.save();
//             res.status(201).end();
//         }
//     })
// })

router.post('/', checkJwt, (req, res) => {
    findUser(req.user.sub).then((user) => {
        if (user.length === 0) {
            console.log("NOTHING HERE");
            const newMovie = req.body;
            const newUser = {
                owner: req.user.sub,
                movieList: [newMovie]
            }
            const newPost = new List(newUser);
            newPost.save();
            res.status(200).json(newUser);
        } else {
            // Alter checkForDuplicate function
            const userId = user[0]._id;
            const newMovie = req.body;
            user[0].movieList.push(newMovie);
            List.findByIdAndUpdate(userId, user[0]).then(() => {
                res.status(200).json(newMovie);
            })
        }
    })
})

router.delete('/:mid', checkJwt, (req, res) => {
    let movieData = req.params.mid;
    findUser(req.user.sub).then((user) => {
        const userId = user[0]._id;
        const newList = user[0].movieList.filter((movies) => {
            return movies._id !== movieData;
        });
        user[0].movieList = newList;
        console.log(user[0].movieList);
        List.findByIdAndUpdate(userId, user[0]).then(() => {
            res.status(201).end();
        })
    })
    // List.findByIdAndDelete(movieData).then(() => {
    //     console.log("DONE");
    //     res.status(204).end();
    // });
})

router.put('/:mid', checkJwt, (req, res) => {
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