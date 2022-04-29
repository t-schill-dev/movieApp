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