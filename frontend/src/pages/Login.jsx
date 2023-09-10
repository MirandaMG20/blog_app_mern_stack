import React, { useState } from 'react'
import { Link } from "react-router-dom"

function Login() {

  useEffect(() => {

    // Function to fetch blogs based on the search term
    const getInfo = async () => {
      // API endpoint URL with the search term we use a "template literals" ${}
      const url = `http://localhost:3000/auth/register`;
      const options = {
        method: 'POST',
      };

      try {
        // console.log(url)
        // Sending the fetch request and awaiting the response
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data)
        //Updating the state with fetched book data
        setInfo(data);
      } catch (error) {
        // Logging an error if the fetch request fails
        console.log(error);
      }
    };
    getInfo()
    // console.log('useEffect is running')
  }, [])

  // console.log(info)

  const loginUser = () => {
    fetch()
  }

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formLogin

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    setFormLogin(userData)
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

        <button type='submit'>Login</button>

        <div>
          Don't have an account yet?
          <Link to={'/register'}>Register</Link>
        </div>

      </form>
    </div>
  )
}

export default Login