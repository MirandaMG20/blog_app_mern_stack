import React, { useState, useEffect } from 'react'
import Likes from '../components/Likes';


function Home() {
  // Initialize state to hold the blog post data
  const [info, setInfo] = useState([])

  // useEffect hook to fetch blog post data when the component mounts
  useEffect(() => {
    const getInfo = async () => {
      const url = `http://localhost:3000/api/blogs`;
      const options = {
        method: 'GET',
      };

      try {
        // console.log(url)
        const response = await fetch(url, options); // Sending the fetch request and awaiting the response
        const data = await response.json();
        // console.log(data)
        setInfo(data); // Update state with the fetched blog data
      } catch (error) {
        console.log(error); // Logging an error if the fetch request fails
      }
    };
    getInfo() // Fetch data when the component mounts
    // console.log('useEffect is running')
  }, []) // Empty dependency array ensures this effect runs only once

  // Format the createdAt date to display only month, date, and year
  const formatDate = (date) => {
    const createdAtDate = new Date(date);
    return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  };

  // Create a reversed copy of the blog data to display the most recent posts first
  const sortedInfo = [...info].reverse();

  // LIKES: (NOT WORKING YET) Function to handle the like action when the user clicks the like button
  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${Blog.id}/like`, {
        method: 'PATCH',
      });

      if (response.status === 200) {
        console.log(`Liked blog with ID: ${id}`);
      } else {
        console.error('Failed to like the blog post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div id='home-container'>

      {/* Map through the sorted blog data and render each blog post */}
      {sortedInfo.map((Blog, i) => (
        <div key={i} className='BlogCard'>
          <h1>{Blog.title}</h1>
          <a>By {Blog.name}</a>
          <a>{formatDate(Blog.createdAt)}</a>
          <p>{Blog.story}</p>

          {/* {Blog.story.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))} */}

          {/* Render the Likes component and pass in the initial likes count and the like handler */}
          <Likes
            initialLikes={Blog.likes}
            onLike={() => handleLike(Blog.id)} />

        </div>
      ))}
    </div>
  )
}

export default Home
