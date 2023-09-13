import React, { useState } from 'react'
import { BsPencilFill } from "react-icons/bs"; <BsPencilFill />

// The `updateBlog` component allows users to update an existing blog post.
function updateBlog({ getBlogs, blog }) {
    // Initialize state for title and story with the values from the `blog` prop.
    const [title, setTitle] = useState(blog.title);
    const [story, setStory] = useState(blog.story);

    // Function to handle updating a blog post.
    const postBlog = async (e) => {
        e.preventDefault();

        // Create an object containing the updated title and story.
        const changeBlog = {
            title,
            story,
        };

        try {
            // Send a PUT request to update the blog post on the server.
            const response = await fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changeBlog),
            });

            if (response.status === 200) {
                console.log('Blog updated successfully');
                 // After a successful update, call `getBlogs` to refresh the blog list.
                getBlogs();
            } else {
                console.log('Update failed');
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='createBlog'>

            <h3>Update Blog</h3>

            <form onSubmit={postBlog} className='createForm'>

                <div>
                    <input
                        type='text'
                        className='inputCreate'
                        id='title'
                        name='title'
                        value={title}
                        placeholder='Title'
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <textarea
                        type='text'
                        className='inputCreate'
                        id='story'
                        name='story'
                        value={story}
                        placeholder='Story'
                        onChange={e => setStory(e.target.value)}
                    />
                </div>

                <button type='submit' className='iconBtns'>
                    <BsPencilFill />
                </button>

            </form>
        </div>
    )
}

export default updateBlog