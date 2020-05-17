const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')

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
      console.log('access token: ', accessToken)
      console.log('refresh token: ', refreshToken)
      console.log('profile: ', profile)
    }
  )
)

