const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Sentry = require('@sentry/node')
const fs = require('fs')
const path = require('path')

// Set up Sentry Error Monitoring 
Sentry.init({
  dsn:
    'https://3e223b83e093450792369f711bdbf8e0@o404118.ingest.sentry.io/5267427',
})

// Set up user collection
require('./models/User')

// Set up Survey collection
require('./models/Survey')

// as not returning anything we can just run it
require('./services/passport')

// connect to the mongoDB database - first arg is URL, second arg is options
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Set up the app
const app = express()

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

// MIDDLEWARES
// Add Morgan to log the API Calls
app.use(morgan('combined', { stream: accessLogStream }))

// Add bodyparser to add route arguments onto res.body
app.use(bodyParser.json())

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


// Routes
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

// code to make app behave when deployed to Prod/Heroku

if (process.env.NODE_ENV === 'production') {
  // Make sure express will server up prod assets, main.js or main.css
  app.use(express.static('client/build'))

  // Express will serve up index.html if it doesn't recognise the route
  // CATCH ALL ROUTES, goes to index.html
  
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT)
