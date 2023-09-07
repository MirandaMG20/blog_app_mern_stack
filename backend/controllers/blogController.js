
//@desc     Get Blogs 
//@route    Get /api/blogs
//@access   Private
const getBlogs = async (req, res) => {
    res.status(200).json({ message: 'Get Blogs' })
}

//@desc     Set blog
//@route    POST /api/blogs
//@access   Private
const setBlog = async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }

    res.status(200).json({ message: 'Create Blog' })
}

//@desc     Update blog
//@route    PUT /api/blogs/:id
//@access   Private
const updateBlog = async (req, res) => {
    res.status(200).json({ message: `Update Blog ${req.params.id}` })
}

//@desc     Delete blog
//@route    DELETE /api/blogs/:id
//@access   Private
const deleteBlog = async (req, res) => {
    res.status(200).json({ message: `Delete Blog ${req.params.id}` })
}

module.exports = {
    getBlogs,
    setBlog,
    updateBlog,
    deleteBlog,
}