// Import the async-handler package to simplify error handling
const asyncHandler = require('express-async-handler')

// Import the Blog model
const Blog = require('../models/blogModel')


// @desc     Create a new blog post
// @route    POST /api/blogs
// @access   Private
const setBlog = asyncHandler(async (req, res) => {
    // Check if the request body contains the required fields (title and story)
    if (!req.body.title || !req.body.story) {
        res.status(400);
        throw new Error('Please provide a title and story for the blog post');
    }
    // Create a new blog instance with the request body
    const blog = new Blog(req.body)

    try {
        // Save the new blog to the database
        const newBlog = await blog.save()

        // Return the newly created blog as a JSON response
        res.status(200).json({ ...newBlog.toObject() });

    } catch (error) {
        // Handle errors and return a 500 (Internal Server Error) status
        res.status(500).json(error)
    }
})

// @desc     Get blogs of a specific user
// @route    GET /api/blogs
// @access   Private
const getBlogs = asyncHandler(async (req, res) => {
    // Get blogs from the database that belong to the specified user
    const blogs = await Blog.find({ userId: req.params.userId })

    // Return the blogs as a JSON response
    res.status(200).json(blogs)
})

// @desc     Get all blogs
// @route    GET /api/blogs/all
// @access   Private
const allBlogs = asyncHandler(async (req, res) => {
    // Get all blogs from the database
    const blogs = await Blog.find()

    // Return all blogs as a JSON response
    res.status(200).json(blogs)
})

// @desc     Update a blog post
// @route    PUT /api/blogs/:id
// @access   Private
const updateBlog = asyncHandler(async (req, res) => {
    // Find the blog to update by its ID
    const blog = await Blog.findById(req.params.id)

    // Check if the blog exists
    if (!blog) {
        res.status(400)
        throw new Error('Blog not found')
    }

    // Update the blog with the new data from the request body
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })

    // Return the updated blog as a JSON response
    res.status(200).json(updatedBlog)
})

// @desc     Delete a blog post
// @route    DELETE /api/blogs/:id
// @access   Private
const deleteBlog = asyncHandler(async (req, res) => {
    // Find the blog by its ID
    const blog = await Blog.findById(req.params.id)

    // Check if the blog exists
    if (!blog) {
        res.status(400)
        throw new Error('Blog not found')
    }

    // Remove the blog from the database
    await Blog.findByIdAndRemove(req.params.id)

    // Return a success message as a JSON response
    res.status(200).json({ message: `Deleted Blog ${req.params.id}` })
})

// Export the route handlers as an object
module.exports = {
    getBlogs,
    allBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}

