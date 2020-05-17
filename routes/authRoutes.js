const passport = require('passport')

module.exports = (app) => {
  // route handler to authenticate user, get access code and scope
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  )

  // route handler to handle the callback from Google
  app.get('/auth/google/callback', passport.authenticate('google'))
}
