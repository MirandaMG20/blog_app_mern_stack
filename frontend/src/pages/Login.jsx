import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate(); // Create a history object

  const loginUser = async (e) => {
    e.preventDefault();

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
        localStorage.setItem('user', JSON.stringify(responseData));

        navigate('/user');
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
    <div >
      <h1>Login</h1>

      <form onSubmit={loginUser}>

        <div>
          <input
            type='email'
            className='form-control'
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
            className='form-control'
            id='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type='submit'>Login</button>

        <div>
          Not a member? <Link to={'/register'}>Register</Link>
        </div>

      </form>
    </div>
  )
}

export default Login