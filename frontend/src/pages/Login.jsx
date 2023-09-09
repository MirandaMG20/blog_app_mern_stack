import React, { useState } from 'react'
import { Link } from "react-router-dom"

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    login(userData)
  }

  return (
    <div >
      <h1>LOGIN</h1>

      <form>

        <div>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            // value={email}
            placeholder='Enter your email'
          // onChange={onChange}
          />
        </div>

        <div>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            // value={password}
            placeholder='Enter your password'
          // onChange={onChange}
          />
        </div>

        <button>Login</button>

        <div>
          Don't have an account yet?
          <Link to={'/register'}>Register</Link>
        </div>

      </form>
    </div>
  )
}

export default Login