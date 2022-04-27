const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    plot: { type: String, required: true },
    genres: [String],
    director: {
        Name: String,
        Bio: String,
        Birth: Date
    },
    actors: [String],
    imageUrl: String
});

let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;