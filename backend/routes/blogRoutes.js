// Importing Dependencies and Controllers
const express = require('express')
const router = express.Router()
// Import from blogController
const { getBlogs, allBlogs, setBlog, updateBlog, deleteBlog } = require('../controllers/blogController')


router.route('/').get(allBlogs).post(setBlog);
router.route('/:userId').get(getBlogs); 

// Route Definitions: Update Blog Route & Delete Blog Route
router.route('/:id').put(updateBlog).delete(deleteBlog)


module.exports = router



// Route Definitions: Get Blogs Route & Create Blog Route
// router.route('/:userId').get(getBlogs)
// router.route('/all').get(allBlogs)
// router.route('/').post(setBlog)


// Get Blogs Route
// router.get('/', (req, res) => {
//     res.status(200).json({ message: 'Get Blogs' })
// })
// router.get('/', getBlogs)

// Create Blog Route
// router.post('/', (req, res) => {
//     res.status(200).json({ message: 'Create Blog' })
// })
// router.post('/', setBlog)

// Update Blog Route
// router.put('/:id', (req, res) => {
//     res.status(200).json({ message: `Update Blog ${req.params.id}` })
// })
// router.put('/:id', updateBlog)

// Delete Blog Route
// router.delete('/:id', (req, res) => {
//     res.status(200).json({ message: `Delete Blog ${req.params.id}` })
// })
// router.delete('/:id', deleteBlog)