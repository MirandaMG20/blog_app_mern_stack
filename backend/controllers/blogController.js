// async-handler package if you do not want to use "try" and "catch"
const asyncHandler = require('express-async-handler')
// Bring in our Blog Controller
const Blog = require('../models/blogModel')

//@desc     Get Blogs 
//@route    GET /api/blogs
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
    // Check if req.user exists and has an id property
    if (!req.user || !req.user._id) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // Check if the request body contains the required fields (title and story)
    if (!req.body.title || !req.body.story) {
        res.status(400)
        throw new Error('Please provide a title and story for the blog post')
    }

    // Create a new blog post using the Blog model
    const blog = await Blog.create({
        title: req.body.title,
        story: req.body.story,
        user: req.user._id, // Use the _id of the authenticated user
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
    // Find blog the id
    const blog = await Blog.findById(req.params.id)

    // if no blog exists
    if (!blog) {
        res.status(400)
        throw new Error('Blog not found')
    }

    await Blog.findByIdAndRemove(req.params.id)

    res.status(200).json({ message: `Delete Blog ${req.params.id}` })
})

module.exports = {
    getBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}