//Dependencies

const express = require('express'),
    cors = require('cors'),
    res = require('express/lib/response'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    path = require('path'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Movies = Models.Movie,
    Users = Models.User;


mongoose.connect('mongodb://localhost:27017/movieApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));

//Restriction of cross origin access app.use needs to be before middleware routes like auth
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) { // if specific origin wasn't found on the list
            let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

//Use passport from external files
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

//USER

// CREATE
app.post('/users', (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.password);
    //check if user exists
    Users.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.username + 'already exists');
            } else {
                //create User with mongoose create command
                Users
                    .create({
                        username: req.body.username,
                        password: hashedPassword,
                        email: req.body.email,
                        birthday: req.body.birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });

});
//READ user by username

app.get('/users/:Username', (req, res) => {
    Users.findOne({ username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).send('Error: ' + err);
        });
});

//UPDATE User
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.Username }, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                birthday: req.body.birthday
            }
        }, { new: true }, // this line makes sure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});


//UPDATE movie from favorites list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, { $push: { favoriteMovies: req.params.MovieID } }, { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});



//DELETE movie from favorites list
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ username: req.params.username }, { $pull: { favoriteMovies: req.params.MovieID } }, { new: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});

//DELETE User
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ username: req.params.username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.username + ' was not found');
            } else {
                res.status(200).send(req.params.username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// MOVIES


// READ all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// READ movie by title
app.get('/movies/:MovieTitle', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ title: req.params.MovieTitle })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Movie not found');
        });
});



//READ movies with certain genre

app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({ genres: req.params.genreName }, { title: true })
        .then((movies) => {
            // Condition empty array
            if (movies.length === 0) {
                console.log('title not found');
                res.status(400).send('title not found');
            } else {
                console.log('title found');
                res.status(200).json(movies);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send('Genre not found');
        })
});


// READ info of director
app.get('/movies/director/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ "director.name": req.params.directorName })
        .then((movie) => {
            if (movie) {
                res.status(200).json(movie.director);
            } else {
                res.status(400).send('Director not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});


//READ all movies actor is in
app.get('/movies/actors/:actorsName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({ 'actors': req.params.actorsName }, { title: true })
        .then((movies) => {
            // Condition empty array
            if (movies.length === 0) {
                res.status(400).send('No actor found');
            } else {
                res.status(200).json(movies);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

//READ cast of movie
app.get('/movies/:movieTitle/actors/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ movieTitle: req.params.movieTitle })

    .then((title) => {
            if (title) {
                res.status(200).send(title.actors);
            } else {
                res.status(400).send('Movie not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

//OLD READ all movies in list of actor
// app.get('/movies/actors/:actorName', (req, res) => {
//     const { actorName } = req.params;
//     const movieName = movies.filter(movie => movie.actors.includes(actorName));

//     if (movieName) {
//         res.status(200).send(movieName)
//             //Code below supposed to return array of movies with same actor
//             // movieName.forEach(movie => {
//             //     let list = [];
//             //     list.push(movie.title);
//             // });
//             // res.status(200).send(list);
//     } else {
//         res.status(400).send('no match found')
//     }
// });

app.listen(8080, () => {
    console.log('Your app ist listening on port 8080');

});