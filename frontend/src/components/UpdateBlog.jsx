import React, { useState } from 'react'
import { BsPencilFill } from "react-icons/bs"; <BsPencilFill />


function updateBlog({ getBlogs, blog }) {

    const [title, setTitle] = useState(blog.title);
    const [story, setStory] = useState(blog.story);

    const postBlog = async (e) => {
        e.preventDefault();

        const changeBlog = {
            title,
            story,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changeBlog),
            });

            if (response.status === 200) {
                console.log('Blog updated successfully');
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
        <div className="UpdateForm">

            <h3>Update Blog</h3>

            <form onSubmit={postBlog}>

                <div>
                    <input
                        type='text'
                        className='form-control'
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
                        className='form-control'
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