const jwtSecret = 'your_jwt_secret';

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); // The local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.username, // The username encoded in the JWT
        expiresIn: '7d',
        algorithm: 'HS256' // algorithm to sign ir encode the values of the JWT
    });
}

//POST login
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something went wrong',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user: user, token: token });
            });
        })(req, res);
    });
}