const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

// extract the users model from mongoose
const User = mongoose.model('users')

// serialize the user with the mongo user id
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// find the user by the id and return the user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

// Set up passport to use Google for auth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    // gets called once we have been successfully back to the server and gives us
    // tokens back from Google
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        // query will return the instance object of what it found
        .then((existingUser) => {
          if (existingUser) {
            // user already exists nothing to do
            done(null, existingUser)
          } else {
            // get the GoogleID and save to database
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user))
          }
        })
    }
  )
)
