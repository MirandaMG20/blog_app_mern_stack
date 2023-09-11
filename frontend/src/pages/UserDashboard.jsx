import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CreateBlog from '../components/CreateBlog'
import UpdateBlog from '../components/UpdateBlog'
import { BsFillXSquareFill, BsPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { FaSignOutAlt } from 'react-icons/fa'


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
    setBlogs([newBlog, ...blogs]);
  };

  const formatDate = (date) => {
    // Format the createdAt date to display only month, date, and year
    const createdAtDate = new Date(date);
    return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  };

  const navigate = useNavigate(); // Initialize history

  // LOGOUT
  const handleLogout = () => {
    console.log('Logout clicked');

    try {
      // Remove user data from localStorage
      localStorage.removeItem('user');

      // Redirect to the login page after logout
      navigate('/home');
    } catch (error) {
      console.error('Error handling logout:', error);
    }
  };

  const sortedBlogs = [...blogs].reverse(); // Create a reversed copy of the blogs array

  return (
    <div className='dashboard'>

      <h1>Welcome {user.name} </h1>

      <Link onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </Link>

      <CreateBlog updateBlogs={updateBlogs} />

      <div>
        {/* Displaying blog details */}
        {sortedBlogs.map((blog, i) => (
          <div key={i} >
            <h2>{blog.title}</h2>
            <a>{formatDate(blog.createdAt)}</a>
            <p>{blog.story}</p>

            <button onClick={e => deleteBlog(blog._id)}>
              <BsFillTrash3Fill />
            </button>

            <button onClick={() => handleEditClick(blog._id)}>
              <BsPencilFill />
            </button>

            {/* Conditional rendering of UpdateBlog with Overlay */}
            {editingBlogId === blog._id && (
              <div>
                <UpdateBlog getBlogs={getBlogs} blog={blog} />
                <button
                  className="overlay-background"
                  onClick={handleOverlayClose}>
                  <BsFillXSquareFill />
                </button>
              </div>)}

          </div>
        ))}
      </div>

    </div >
  )
}

export default UserDashboard