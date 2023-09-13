import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { BsPencilSquare } from "react-icons/bs";

function Register() {
  // Initialize state variables for user registration
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Create a history object for navigation
  const navigate = useNavigate(); 

  // Function to handle user registration when the form is submitted
  const registerUser = async (e) => {
    e.preventDefault();

     // Create an object containing user registration data
    const newUser = {
      name,
      email,
      password,
    };


    try {
      // Send a POST request to the registration endpoint
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 200) {
        // Registration successful
        console.log('Registration successful');
        // If registration is successful, navigate to the login page
        navigate('/login');
      } else {
        // Registration failed
        console.log('Registration failed');
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>

      <form onSubmit={registerUser}>

        <div>
          <input
            type='text'
            className='registerForm'
            id='name'
            name='name'
            value={name}
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type='email'
            className='registerForm'
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
            className='registerForm'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='iconBtns'>
          <BsPencilSquare/>
        </button>

        <div>
          Already a member? 
          {/* Link to the login page */}
          <Link to={'/login'}>Login</Link>
        </div>

      </form>
    </div>
  )
}

export default Register