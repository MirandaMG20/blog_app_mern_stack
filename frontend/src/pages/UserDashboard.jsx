import React, { useState, useEffect } from 'react'
import CreateBlog from '../components/CreateBlog'
import UpdateBlog from '../components/UpdateBlog'



function UserDashboard() {
  const user = JSON.parse(localStorage.user);

  const [blogs, setBlogs] = useState([])

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
    <div>
      <h1>Welcome {user.name}!</h1>

      {/* <div>Name: {user.name}</div>
      <div>Email: {user.email}</div> */}

      <CreateBlog updateBlogs={updateBlogs} />

      <div>
        {blogs.map((blog, i) => (
          <div key={i}>
            <h2>{blog.title}</h2>
            <p>{blog.story}</p>
            <a>{formatDate(blog.createdAt)}</a>

            {/* Create an Update Button */}

            <UpdateBlog getBlogs={getBlogs} blog={blog} />

            <button onClick={e => deleteBlog(blog._id)}>Delete</button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default UserDashboard