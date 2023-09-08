// async-handler package if you do not want to use "try" and "catch"
const asyncHandler = require('express-async-handler')
// Bring in our Blog Controller
const Blog = require('../models/blogModel')

//@desc     Get Blogs 
//@route    Get /api/blogs
//@access   Private
const getBlogs = asyncHandler(async (req, res) => {
    // Get Blogs from the database find by user id
    const blogs = await Blog.find() // {user: req.user.id}

    // Return the blogs
    res.status(200).json(blogs)
})

//@desc     Set blog
//@route    POST /api/blogs
//@access   Private
const setBlog = asyncHandler(async (req, res) => {
    // if no text throw an error
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add Blog')
    }

    const blog = await Blog.create({
        text: req.body.text,
        // user: req.user.id,
        // text: req.body.text
    })

    res.status(200).json(blog)
})

//@desc     Update blog
//@route    PUT /api/blogs/:id
//@access   Private
const updateBlog = asyncHandler(async (req, res) => {
    // Find the blog to update
    const blog = await Blog.findById(req.params.id)

    // if no blog exists
    if (!blog) {
        res.status(400)
        throw new Error('Blog not found')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedBlog)
})

//@desc     Delete blog
//@route    DELETE /api/blogs/:id
//@access   Private
const deleteBlog = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Blog ${req.params.id}` })
})

module.exports = {
    getBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}