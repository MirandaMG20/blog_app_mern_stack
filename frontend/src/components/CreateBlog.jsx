import React, { useState } from 'react'
import { BsEnvelopeHeartFill, BsFillEnvelopePaperHeartFill } from "react-icons/bs";


function createBlog({ updateBlogs }) {
    const user = JSON.parse(localStorage.user);

    const [title, setTitle] = useState('')
    const [story, setStory] = useState('')

    const postBlog = async (e) => {
        e.preventDefault();

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
                <BsEnvelopeHeartFill />
                <br/>
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