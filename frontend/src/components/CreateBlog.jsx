import React, { useState } from 'react'
import { BsFillEnvelopePaperHeartFill } from "react-icons/bs";


function createBlog({ updateBlogs }) {
    // Get the user data from local storage or set it to null if not found
    const userString = localStorage.getItem('user');
    // Parse user data or set to null if not found
    const user = userString ? JSON.parse(userString) : null;

    // Define state variables for title and story
    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')

     // Function to handle the form submission
    const postBlog = async (e) => {
        e.preventDefault();

        if (!user) {
            // If user data is not found in localStorage, log an error and redirect to the login page
            console.error('User data not found in localStorage');
            window.location.href = '/login'; // Redirect to the login page
        }

        // Create a new blog object with title, name, story, and userId
        const newBlog = {
            title,
            name: user.name,
            story,
            userId: user._id,
        };

        try {
            // Send a POST request to the API to create a new blog
            const response = await fetch('http://localhost:3000/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlog),
            });

            if (response.status === 200) {
                // If the request is successful, log a success message
                console.log('Blog posted successfully');

                // Get the data from the response and update the blogs
                const data = await response.json();
                updateBlogs(data);

                // Clear the text input fields
                setTitle('');
                setStory('');
            } else {
                // If the request fails, log an error and handle the error response
                console.log('Post failed');
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            // Handle any network or server errors
            console.error('Error:', error);
        }
    };

    return (
        <div className='createBlog'>

            <h2>Let's Blog!</h2>

            <form onSubmit={postBlog} className='createForm'>

                {/* <div>
                    <input
                        type='file'
                        className='inputCreate'
                        id='image'
                        name='image'
                        // value={image}
                        placeholder='Image'
                    />
                </div> */}

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