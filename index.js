const express = require('express')

// as not returning anything we can just run it
require('./services/passport')


const app = express()

// Auth routes are defined in the authRoutes file, pass in the app
require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT)