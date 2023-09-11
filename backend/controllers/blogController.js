// async-handler package if you do not want to use "try" and "catch"
const asyncHandler = require('express-async-handler')
// Handles file uploads in Node.js
const multer = require('multer');
// Bring in our Blog Controller
const Blog = require('../models/blogModel')


// Define a storage location for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // cb = callback
        cb(null, 'uploads/') // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + 'file.png') // Rename the file to include a timestamp
    }
 // upload.single('image'),    
})
// Create a multer instance with the storage configuration
const upload = multer({ storage: storage })


//@desc     Post blog
//@route    POST /api/blogs
//@access   Private
const setBlog = asyncHandler(async (req, res) => {
    // Check if the request body contains the required fields (title and story)
    if (!req.body.title || !req.body.story) {
        res.status(400);
        throw new Error('Please provide a title and story for the blog post');
    }

    const blog = new Blog(req.body)
    try {
        const newBlog = await blog.save()

        res.status(200).json({ ...newBlog.toObject()});

    } catch (error) {
        res.status(500).json(error)
    }
})

//@desc     Get Blogs 
//@route    GET /api/blogs
//@access   Private
const getBlogs = asyncHandler(async (req, res) => {
    // Get Blogs from the database
    const blogs = await Blog.find({userId: req.params.userId})

    // Return the blogs
    res.status(200).json(blogs)
})

//@desc     Get All Blogs 
//@route    GET /api/all
//@access   Private
const allBlogs = asyncHandler(async (req, res) => {
    // Get Blogs from the database
    const blogs = await Blog.find()

    // Return the blogs
    res.status(200).json(blogs)
})

//@desc     Update blog
//@route    PUT /api/blogs/:id
//@access   Private
const updateBlog = asyncHandler(async (req, res) => {
    // Find the blog to update
    const blog = await Blog.findById(req.params.id)

    // Check if blog exists
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

    res.status(200).json({ message: `Deleted Blog ${req.params.id}` })
})

module.exports = {
    getBlogs,
    allBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}



//  // Check if an image file was uploaded
//  if (!req.file) {
//     res.status(400);
//     throw new Error('Please upload an image file');
// }

// try {
//     // Create a new blog post using the Blog model
//     const blog = await Blog.create({
//         title: req.body.title,
//         story: req.body.story,
//         user: req.user._id, // Use the id of the authenticated user
//         image: req.file.path, // Save the file path in the 'picture' field
//     });

//     // Format the createdAt date to display only month, date, and year
//     const createdAtDate = new Date(blog.createdAt);
//     const formattedDate = `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;

//     res.status(200).json({ ...blog.toObject(), createdAt: formattedDate });
// } catch (error) {
//     res.status(500).json(error);
// }
// NOT WORKING Check if the request body contains the required fields (title and story)
// if (!req.body.title || !req.body.story) {
//     res.status(400)
//     throw new Error('Please provide a title and story for the blog post')
// }

// Create a new blog post using the Blog model
// const blog = await Blog.create({
//     title: req.body.title,
//     story: req.body.story,
//     user: req.user.id, // Use the id of the authenticated user
// })