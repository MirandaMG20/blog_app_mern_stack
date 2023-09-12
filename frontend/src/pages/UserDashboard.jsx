import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CreateBlog from '../components/CreateBlog'
import UpdateBlog from '../components/UpdateBlog'
import { BsFillXSquareFill, BsPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { FaSignOutAlt } from 'react-icons/fa'


function UserDashboard({ editBlogs }) {
  const userString = localStorage.getItem('user');
  // Parse user data or set to null if not found
  const user = userString ? JSON.parse(userString) : null;

  const [blogs, setBlogs] = useState([])
  const [editingBlogId, setEditingBlogId] = useState(null);
  const isMounted = useRef(false); // Add a ref to track component mounting state

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
    if (!user) {
      return; // Don't make the API call if user is null
    }

    // API endpoint URL with the user's ID
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
      //Updating the state with fetched blog data
      setBlogs(data);
    } catch (error) {
      // Logging an error if the fetch request fails
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      // Component is mounting, do not fetch blogs
      isMounted.current = true;
    } else if (user) {
      // Component is already mounted and user is available, fetch blogs
      getBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]) // Include 'user' in the dependency array to update when user changes

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
      //Updating the state with fetched blog data
      getBlogs();
    } catch (error) {
      // Logging an error if the fetch request fails
      console.log('Error deleting blog:', error);
    }
  }

  const updateBlogs = (newBlog) => {
    // Add the new blog to the existing list of blogs
    setBlogs([newBlog, ...blogs]);
  };

  // Create a reversed copy of the blogs array
  const sortedBlogs = [...blogs].reverse();

  const formatDate = (date) => {
    // Format the createdAt date to display only month, date, and year
    const createdAtDate = new Date(date);
    return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  };

  // LOGOUT
  const navigate = useNavigate(); // Initialize history
  const handleLogout = () => {
    console.log('Logout clicked');
    try {
      localStorage.removeItem('user'); // Remove user data from localStorage
      setBlogs([]); // Clear the blogs state
      setEditingBlogId(null); // Clear the editingBlogId state
      navigate('/'); // Redirect to the Home page after logout
    } catch (error) {
      console.error('Error handling logout:', error);
    }
  };

  return (
    <div className='dashboard'>

      <h1>Welcome {user ? user.name : 'Guest'} </h1>

      <Link onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </Link>

      <CreateBlog updateBlogs={updateBlogs} />

      <div>
        {/* Displaying blog details */}
        {sortedBlogs.map((blog, i) => (

          <div key={i} >
            <div className="dashBlog">
              <h2>{blog.title}</h2>
              <a>{formatDate(blog.createdAt)}</a>
              <p>{blog.story}</p>
              <div>

                <button
                  className="iconBtns"
                  onClick={e => deleteBlog(blog._id)}>
                  <BsFillTrash3Fill />
                </button>

                <button
                  className="iconBtns"
                  onClick={() => handleEditClick(blog._id)}>
                  <BsPencilFill />
                </button>
                
              </div>
            </div>

            {/* Conditional rendering of UpdateBlog with Overlay */}
            {editingBlogId === blog._id && (
              <div className='updateForm'>

                <UpdateBlog getBlogs={getBlogs} blog={blog} />

                <button
                  type="button"
                  className="iconBtns"
                  id='closeUpdate'
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