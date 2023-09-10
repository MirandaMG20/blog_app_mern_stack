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
  }, [])

  // console.log(info)

  return (

    <div>

      {info.map((Blog,i) => (
        <div key={i}>
          <h2>{Blog.title}</h2>
          <p>{Blog.story}</p>
        </div>
      ))}

    </div>
  )
}

export default Home