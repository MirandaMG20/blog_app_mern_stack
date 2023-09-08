const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// New User Register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(8)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name })

        // If no user
        if (!user) {
           return res.status(400).json('No user found')
        }

        // If the user exists, compare the password
        const validate = await bcrypt.compare(req.body.password, user.password)

        // If the password is not valid
        if (!validate) {
            return res.status(400).json('Wrong login!');
        }

        // If everything is valid, send the user data (excluding password)
        const { password, ...other } = user._doc
        return res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router