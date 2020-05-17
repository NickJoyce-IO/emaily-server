const mongoose = require('mongoose')
const { Schema } = mongoose

// Set up the schema for the users collection
const userSchema = new Schema ({
    googleId: String
})

// Set up the collection
mongoose.model('users', userSchema)