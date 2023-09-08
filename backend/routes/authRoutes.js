const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


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


module.exports = router