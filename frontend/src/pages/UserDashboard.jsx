import React, { useState, useEffect } from 'react'
import CreateBlog from '../components/CreateBlog'
import UpdateBlog from '../components/UpdateBlog'
import { BsFillXSquareFill, BsEnvelopeHeartFill } from "react-icons/bs";
//  BsFillPencilFill BsClipboardCheck 


function UserDashboard({ editBlogs }) {
  const user = JSON.parse(localStorage.user);

  const [blogs, setBlogs] = useState([])
  const [editingBlogId, setEditingBlogId] = useState(null);

  const handleEditClick = (blogId) => {
    // Set the editingBlogId to the clicked blog's ID
    setEditingBlogId(blogId);
  };

  const handleOverlayClose = () => {
    // Close the overlay by setting editingBlogId to null
    setEditingBlogId(null);
  };

  // Function to fetch blogs based on the search term
  const getBlogs = async () => {
    // API endpoint URL with the search term we use a "template literals" ${}
    const url = `http://localhost:3000/api/blogs/${user._id}`;
    const options = {
      method: 'GET',
    };

    try {
      // console.log(url)
      // Sending the fetch request and awaiting the response
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data)
      //Updating the state with fetched book data
      setBlogs(data);
    } catch (error) {
      // Logging an error if the fetch request fails
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs()
    // console.log('useEffect is running')
  }, []) // Empty dependency array ensures this effect runs only once

  const deleteBlog = async (blogId) => {
    const url = `http://localhost:3000/api/blogs/${blogId}`;
    const options = {
      method: 'DELETE',
    };

    try {
      // console.log(url)
      // Sending the fetch request and awaiting the response
      await fetch(url, options);
      // console.log(data)
      //Updating the state with fetched book data
      getBlogs();
    } catch (error) {
      // Logging an error if the fetch request fails
      console.log(error);
    }
  }

  const updateBlogs = (newBlog) => {
    // Add the new blog to the existing list of blogs
    setBlogs([...blogs, newBlog]);
  };

  const formatDate = (date) => {
    // Format the createdAt date to display only month, date, and year
    const createdAtDate = new Date(date);
    return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  };

  return (
    <div className='dashboard'>
      <h1>
        Welcome {user.name}!
      </h1>

      <CreateBlog updateBlogs={updateBlogs} />

      <div>
        {/* Displaying blog details */}
        {blogs.map((blog, i) => (
          <div key={i} >
            <h2>{blog.title}</h2>
            <p>{blog.story}</p>
            <a>{formatDate(blog.createdAt)}</a>
            <br />
            <br />

            <button onClick={e => deleteBlog(blog._id)}>
              <BsFillXSquareFill />
            </button>

            {/* UpdateBlog i want it to be an overlay */}
            <button onClick={() => handleEditClick(blog._id)}>Edit</button>

            {/* Conditional rendering of UpdateBlog with overlay */}
            {editingBlogId === blog._id && (
              <div>
                <UpdateBlog getBlogs={getBlogs} blog={blog} />
                <button className="overlay-background" onClick={handleOverlayClose}>Close</button>
                
              </div>)}



          </div>
        ))}
      </div>

    </div >
  )
}

export default UserDashboard