// config/passport.js

// load all the things we need
var passportHttp = require('passport-http');

// load up the user model
var User       		= require('../models/usermodel');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // SIGNUP ==================================================================
    // =========================================================================

//     passport.use('local-signup', new LocalStrategy({
//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) {

// 		// find a user whose email is the same as the forms email
// 		// we are checking to see if the user trying to login already exists
//         User.findOne({ 'local.email' :  email }, function(err, user) {
//             // if there are any errors, return the error
//             if (err)
//                 return done(err);

//             // check to see if theres already a user with that email
//             if (user) {
//                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             } else {

// 				// if there is no user with that email
//                 // create the user
//                 var newUser            = new User();

//                 // set the user's local credentials
//                 newUser.usename    = email;
//                 newUser.password   = newUser.generateHash(password); // use the generateHash function in our user model

// 				// save the user
//                 newUser.save(function(err) {
//                     if (err)
//                         throw err;
//                     return done(null, newUser);
//                 });
//             }

//         });

//     }));

    // =========================================================================
    // LOGIN ===================================================================
    // =========================================================================

    passport.use(new passportHttp.BasicStrategy(function(username, password, done) {
        //find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found
            if (!user)
                return done(null, null);

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, null);

            // all is well, return successful user
            return done(null, user);
        });
    }));
}