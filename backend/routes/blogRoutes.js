// Importing Dependencies and Controllers
const express = require('express')
const router = express.Router()

// Get Blogs Route
router.get('/', (req, res) => {
    res.status(200).json({message: 'Get Blogs'})
})

// Create Blog Route
router.post('/', (req, res) => {
    res.status(200).json({message: 'Create Blog'})
})

// Update Blog Route
router.put('/:id', (req, res) => {
    res.status(200).json({message: `Update Blog ${req.params.id}`})
})

// Delete Blog Route
router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Delete Blog ${req.params.id}`})
})

module.exports = router