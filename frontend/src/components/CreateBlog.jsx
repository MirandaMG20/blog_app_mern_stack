import React, { useState, useNavigate } from 'react'
import { BsFillEnvelopePaperHeartFill } from "react-icons/bs";


function createBlog({ updateBlogs }) {
    // const user = JSON.parse(localStorage.user);

    const userString = localStorage.getItem('user');
    // Parse user data or set to null if not found
    const user = userString ? JSON.parse(userString) : null;

    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')


    const postBlog = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User data not found in localStorage');
            window.location.href = '/login'; // Redirect to the login page
        }

        const newBlog = {
            title,
            name: user.name,
            story,
            userId: user._id,
        };

        try {
            const response = await fetch('http://localhost:3000/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });

            if (response.status === 200) {
                console.log('Blog posted successfully');
                const data = await response.json();
                updateBlogs(data);

                // Clear the text input fields
                setTitle('');
                setStory('');
            } else {
                console.log('Post failed');
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='createBlog'>

            <h2>
                Let's Blog!
            </h2>

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
                    < BsFillEnvelopePaperHeartFill />
                </button>

            </form>
        </div>
    )
}

export default createBlog