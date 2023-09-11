import React from 'react'

function async getBlogs(userId) {

  try {
    const response = await fetch('http://localhost:3000/api/blogs/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return await response.json();

    } else {
      console.log('Get blog failed');
      const errorData = await response.json();
      console.error(errorData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function UserDashboard() {
  const user = JSON.parse(localStorage.user);


  const blogs = getBlogs(user._id);
  console.log(blogs)

  return (
    <div>
      <h1>User Dashboard</h1>

      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>


    </div>
  )
}

export default UserDashboard