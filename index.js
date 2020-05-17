const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')

// as not returning anything we can just run it
require('./services/passport')

// connect to the mongoDB database - first arg is URL, second arg is options
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Set up the app
const app = express()

// Auth routes are defined in the authRoutes file, pass in the app
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT)
