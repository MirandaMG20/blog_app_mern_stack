import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt } from 'react-icons/fa'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Create a history object for navigation
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    // Create an object to send as the request body
    const authUser = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authUser),
      });

      // If Login is successful, navigate to the user dashboard, otherwise display error
      if (response.status === 200) {
        console.log('Login successful');
        const responseData = await response.json(); // Convert the response body to JSON
        localStorage.setItem('user', JSON.stringify(responseData)); // Store user data in local storage

        navigate('/user'); // Redirect to the user dashboard
      } else {
        console.log('Login failed');
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>

      <form onSubmit={loginUser}>

        <div>
          <input
            type='email'
            className='loginForm'
            id='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type='password'
            className='loginForm'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='iconBtns'>
          <FaSignInAlt />
        </button>

        <div>
          Not a member? 
          {/* Link to the registration page */}
          <Link to={'/register'}>Register</Link> 
        </div>

      </form>
    </div>
  )
}

export default Login