import { Routes, Route } from 'react-router-dom'
import React from "react"
import "./index.css";
import Header from "./components/Header"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDashboard from './pages/UserDashboard'

function App() {

    // // Function to fetch books based on the search term
    // const getInfo = async () => {
    //   // API endpoint URL with the search term we use a "template literals" ${}
    //   const url = `http://localhost:3000`;
    //   const options = {
    //     method: 'GET',
    //     headers: {
    //       'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    //       'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
    //     }
    //   };
  
    //   try {
    //     // Sending the fetch request and awaiting the response
    //     const response = await fetch(url, options);
    //     const data = await response.json();
    //     // console.log(data)
    //     //Updating the state with fetched book data
    //     setBooks(data);
    //   } catch (error) {
    //     // Logging an error if the fetch request fails
    //     console.log(error);
    //   }
    // };

  return (
    <>
      <Header />

      {/* ROUTES */}
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<UserDashboard />} />
      </Routes>
    </>
  )
}


export default App
