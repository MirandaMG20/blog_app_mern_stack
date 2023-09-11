import React, { useState, useEffect } from 'react'


function Home() {

  const [info, setInfo] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      const url = `http://localhost:3000/api/blogs`;
      const options = {
        method: 'GET',
      };

      try {
        // console.log(url)
        // Sending the fetch request and awaiting the response
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data)
        // Updating the state 
        setInfo(data);
      } catch (error) {
        // Logging an error if the fetch request fails
        console.log(error);
      }
    };
    getInfo()
    // console.log('useEffect is running')
  }, []) // Empty dependency array ensures this effect runs only once

  // Format the createdAt date to display only month, date, and year
  const formatDate = (date) => {
    const createdAtDate = new Date(date);
    return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  };

  const sortedInfo = [...info].reverse(); // Create a reversed copy of the blogs array

  return (

    <div id='home-container'>

      {sortedInfo.map((Blog, i) => (
        <div key={i} className='BlogCard'>
          <h2>{Blog.title}</h2>
          <a>By {Blog.name}</a>
          <a>{formatDate(Blog.createdAt)}</a>
          <p>{Blog.story}</p>
        </div>
      ))}

    </div>
  )
}

export default Home
