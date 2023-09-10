import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate(); // Create a history object

  const registerUser = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
    };

    try {
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
        // If registration is successful, navigate to the user dashboard
        navigate('/user');
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
    <div >
      <h1>Register</h1>

      <form onSubmit={registerUser}>

        <div>
          <input
            type='text'
            className='form-control'
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

        <button type='submit'>Register</button>

        <div>
          Already a member? <Link to={'/login'}>Login</Link>
        </div>

      </form>
    </div>
  )
}

export default Register