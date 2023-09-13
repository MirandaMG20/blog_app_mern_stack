const mongoose = require('mongoose')

// User Register Model
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'] // Field is required with an error message if missing
        },
        email: {
            type: String,
            unique: true, // Ensures email uniqueness in the database
            lowercase: true, // Stores email addresses in lowercase for consistency
            required: [true, 'Please enter an email']
            
        },
        password: {
            type: String,
            required: [true, 'Please enter a password']
        },
        picture: {
            type: String,
            default: '', // Default value if not provided
            required: [false, 'Please add your picture'] // Field is optional with an error message if provided
        },
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt timestamps
    })

module.exports = mongoose.model('User', userSchema) // Create and export the User model based on the schema