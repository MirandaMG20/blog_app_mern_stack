const router = require('express').Router()
const bcrypt = require('bcrypt')
// Import User Model
const User = require('../models/userModel')
// Import Blog Model
const Blog = require('../models/blogModel')

// Update User's Information
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
            res.status(200).json(updateUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json('Update your account')
    }
})

// Get User
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        // console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' }); // Use 500 for server errors
        // res.status(400).json(other)
    }
})

// Delete User's Account
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
                res.status(200).json('User has been deleted.')
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json('User not found...')
        }
    } else {
        res.status(401).json('You are not authorized to delete this account.')
    }
})


module.exports = router