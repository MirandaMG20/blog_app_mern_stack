const router = require('express').Router()
const bcrypt = require('bcrypt')
// Import User Model
const User = require('../models/userModel')


//@desc     Register a new user
//@route    POST /auth/register
//@access   Public
router.post('/register', async (req, res) => {
    try {
        // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(10)
        // Hash the user's password using the generated salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Create a new User instance with the provided data
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        // Save the new user to the database
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status
        res.status(500).json(error)
    }
})

//@desc   Authenticate a user
//@route  POST /auth/login
//@access Private
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Find a user by their email
        const user = await User.findOne({ email })

        // If no user is found, return a 400 (Bad Request) status
        if (!user) {
            return res.status(400).json('No user found')
        }

        // If the user exists, compare the provided password with the hashed password
        if (await bcrypt.compare(password, user.password)) {
            // Return user information (excluding the password) as a JSON response
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
            })
        } else {
            // If the passwords do not match, return a 400 (Bad Request) status
            res.status(400).json('Wrong login!')
        }
    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status
        return res.status(500).json(error)
    }
})

//@desc   Logout a user (dummy route, no actual session or token handling)
//@route  POST /auth/logout
//@access Private
router.post('/logout', async (req, res) => {
    // Return a success message as a JSON response
    res.status(200).json({ message: 'Logout successful' });
})


module.exports = router