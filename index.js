const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')

// Set up user collection
require('./models/User')

// as not returning anything we can just run it
require('./services/passport')

// connect to the mongoDB database - first arg is URL, second arg is options
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Set up the app
const app = express()

// set up express to use cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000 , // 30 days
        keys: [keys.cookieKey] 
    })
)

// allow passport to work with cookies
app.use(passport.initialize())
app.use(passport.session())

// Auth routes are defined in the authRoutes file, pass in the app
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT)
