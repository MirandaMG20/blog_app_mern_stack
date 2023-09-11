const router = require('express').Router()
const bcrypt = require('bcrypt')
// Import User Model
const User = require('../models/userModel')


//@desc     Register new user
//@route    POST /auth/register
//@access   Private
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // Create User
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

//@desc   Authenticate a user
//@route  POST /auth/login
//@access Private
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user by email
        const user = await User.findOne({ email })

        // If no user
        if (!user) {
            return res.status(400).json('No user found')
        }

        // If the user exists, compare the password
        if (await bcrypt.compare(password, user.password)) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
            })
        } else {
            res.status(400).json('Wrong login!')
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

//@desc   Logout a user (dummy route, no actual session or token handling)
//@route  POST /auth/logout
//@access Private
router.post('/logout', async (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
})


module.exports = router