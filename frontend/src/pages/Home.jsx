import React, { useState, useEffect } from 'react'


function Home() {

  const [info, setInfo] = useState([])

  useEffect(() => {
    // Function to fetch blogs based on the search term
    const getInfo = async () => {
      // API endpoint URL with the search term we use a "template literals" ${}
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
        //Updating the state with fetched book data
        setInfo(data);
      } catch (error) {
        // Logging an error if the fetch request fails
        console.log(error);
      }
    };
    getInfo()
    // console.log('useEffect is running')
  }, []) // Empty dependency array ensures this effect runs only once

  const formatDate = (date) => {
    // Format the createdAt date to display only month, date, and year
    const createdAtDate = new Date(date);
    return `${createdAtDate.getMonth() + 1}/${createdAtDate.getDate()}/${createdAtDate.getFullYear()}`;
  };

  return (

    <div className="d-flex flex-wrap" id='home-container'>

      {info.map((Blog, i) => (
        <div key={i} className='BlogCard'>
          <h2>{Blog.title}</h2>
          <a>By {Blog.name}</a>
          <p>{Blog.story}</p>
          <a>{formatDate(Blog.createdAt)}</a>
        </div>
      ))}

    </div>
  )
}

export default Home