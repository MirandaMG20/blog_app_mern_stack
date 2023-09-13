const mongoose = require('mongoose')

// Blog Entry Model
const blogSchema = mongoose.Schema(
    {
        image: {
            type: String,
            require: false, // Field is optional
        },
        title: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        story: {
            type: String,
            require: true,
        },
        userId: {
            type: String,
            require: true,
        },
        likes: {
            type: Number,
            default: 0, // Initialize likes count to 0
        },
    },
    {
        timestamps: true // Automatically add createdAt and updatedAt timestamps
    }
)

module.exports = mongoose.model('Blog', blogSchema) // Create and export the Blog model based on the schema

