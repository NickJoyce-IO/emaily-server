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

  // logout route handler
  app.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  })
  
  // Get the current logged in user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })
}
