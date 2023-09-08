const mongoose = require('mongoose')

// Blog Entry Model
const blogSchema = mongoose.Schema(
    {
        image: {
            type: String,
            required: [false, 'Add an image']
        },
        name: {
            type: String,
            // required: [true, 'Please write title']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // Id of the user
            // required: true,
            ref: 'User' // Reference to the User model
        },
        text: {
            type: String,
            required: [true, 'Please write story']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Blog', blogSchema)