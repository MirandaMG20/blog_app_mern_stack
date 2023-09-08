const mongoose = require('mongoose')

// User Info Model
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please enter an email']
            
        },
        password: {
            type: String,
            required: [true, 'Please enter a password']
        },
        picture: {
            type: String,
            default: '',
            required: [false, 'Please add your picture']
        },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)