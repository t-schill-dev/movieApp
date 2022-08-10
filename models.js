const mongoose = require("mongoose"),
    bcrypt = require("bcrypt");

let movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    plot: { type: String, required: true },
    genres: [String],
    director: {
        name: String,
        bio: String,
        birth: Date,
    },
    actors: [String],
    imageUrl: [String],
});

let userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: Date, required: false },
    favoriteMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    }, ],
});

/** 
 * Encrypting password
 * @function hashPassword
 * @param {string} password
 * @returns {string} hashed password
 * @requires bcrypt
 * */
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;