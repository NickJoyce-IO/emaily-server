const mongoose = require('mongoose')
const { Schema } = mongoose

// Set up the schema for the users collection
const userSchema = new Schema ({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    }
})

// Set up the collection
mongoose.model('users', userSchema)