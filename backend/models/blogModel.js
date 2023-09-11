const mongoose = require('mongoose')

// Blog Entry Model
const blogSchema = mongoose.Schema(
    {
        image: {
            type: String,
            require: false,
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
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Blog', blogSchema)


    // image: {
    //     type: String
    // },
    // title: {
    //     type: String,
    //     required: [true, 'Please write title']
    // },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId, // Id of the user
    //     ref: 'User', // Reference to the User model
    //     // required: true,
    // },
    // story: {
    //     type: String,
    //     required: [true, 'Please write story']
    // }