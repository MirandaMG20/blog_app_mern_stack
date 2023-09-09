import React, { useState } from 'react'
import { Link } from "react-router-dom"

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const registerUser = () => {
    fetch
  }


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

        <button>Login</button>

        <div>
          Already a member?
          <Link to={'/login'}>Login</Link>
        </div>

      </form>
    </div>
  )
}

export default Register