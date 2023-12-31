const router = require('express').Router()
const bcrypt = require('bcrypt')
// Import User Model
const User = require('../models/userModel')
// Import Blog Model
const Blog = require('../models/blogModel')


//@desc     Set user
//@route    GET /users/:id
//@access   Private
router.get('/:id', async (req, res) => {
    try {
        // Find a user by their ID
        const user = await User.findById(req.params.id)

        // Exclude the password from the user data before sending the response
        const { password, ...other } = user._doc

        // Send the user data (excluding password) in the response
        res.status(200).json(other)
    } catch (error) {
        // console.error(error); // Log the error for debugging
        // Handle server errors by sending a 500 status code and a message
        res.status(500).json({ message: 'Server error' }); 
    }
})

//@desc     Update user
//@route    PUT /users/:id
//@access   Private
router.put('/:id', async (req, res) => {
    // Password Hashing
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            // Update User in the Database
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    // $set: req.body = MongoDB will update only the specified fields (name, email, and password) with their new values, leaving other fields (e.g., timestamps or any other fields not present in req.body) unchanged.
                    $set: req.body,
                },
                {
                    new: true,
                }
            )

            // Send the updated user data in the response
            res.status(200).json(updateUser)
        } catch (error) {
             // Handle server errors by sending a 500 status code and the error object
            res.status(500).json(error)
        }
    } else {
        // If the user is not authorized to update the account, send a 401 status code and a message
        res.status(401).json('Update your account')
    }
})

//@desc     Delete user
//@route    DELETE /users/:id
//@access   Private
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        // delete user's account and blogs
        try {
            const user = await User.findById(req.params.id)
            try {
                // delete all user's Blogs
                await Blog.deleteMany({ name: user.name })

                // find and Delete user account
                await User.findByIdAndRemove(req.params.id)

                // Send a success message in the response
                res.status(200).json('User has been deleted.')
            } catch (error) {
                // Handle server errors during blog deletion
                res.status(500).json(error)
            }
        } catch (error) {
            // Handle user not found error
            res.status(404).json('User not found...')
        }
    } else {
        // If the user is not authorized to delete the account, send a 401 status code and a message
        res.status(401).json('You are not authorized to delete this account.')
    }
})


module.exports = router