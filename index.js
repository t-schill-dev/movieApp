//Dependencies

const res = require('express/lib/response');

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    path = require('path'),
    mongoose = require('mongoose'),
    Models = require('./models.js');

const Movies = Models.Movie,
    Users = Models.User;

//Dependencies for Authentication of Users
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportJWT = require('passport-jwt');

let JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJWT;


mongoose.connect('mongodb://localhost:27017/movieApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './public')));
/*
//Use passport
let auth = require('./auth')(app);
require('./passport');

// Basic HTTP Auth
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, callback) => {
    console.log(username + ' ' + password);
    Users.findOne({ username: username }, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('incorrect username');
            return callback(null, false, { message: 'Incorrect username or password' });
        }
        console.log('finished');
        return callback(null, user);
    });
}));

//JTW Auth
passport.user(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret',
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));

*/


//USER

// CREATE
app.post('/users', (req, res) => {
    //check if user exists
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                //create User with mongoose create command
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
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
            res.status(500).send('Error:' + error);
        });

});
//READ user by username

app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

//UPDATE User
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $push: { FavoriteMovies: req.params.MovieID } }, { new: true },
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
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $pull: { FavoriteMovies: req.params.MovieID } }, { new: true },
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
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});


// MOVIES


// READ all movies
app.get('/movies', (req, res) => {
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
app.get('/movies/:MovieTitle', (req, res) => {
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

app.get('/movies/genres/:genreName', (req, res) => {
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
app.get('/movies/director/:directorName', (req, res) => {
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
app.get('/movies/actors/:actorsName', (req, res) => {
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
app.get('/movies/:movieTitle/actors/', (req, res) => {
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