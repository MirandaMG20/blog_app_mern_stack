// Import useState from react
import React, { useState } from 'react'
import { BsFillSuitHeartFill } from "react-icons/bs";
// 

function Likes({ initialLikes, onLike }) {
    // Initialize state for likes and liked status
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);

    // Function to handle the like button click
    const handleLikeClick = () => {
        if (!liked) {
            // Increase the likes count by 1 and mark as liked
            setLikes(likes + 1);
            setLiked(true);

            // Notify the parent component about the like
            onLike();
        }
    };

    return (
        <div className='likes'>

            {/* Button to like a post */}
            <button
                className='iconBtns'
                onClick={handleLikeClick}
                disabled={liked}>
                <BsFillSuitHeartFill />
            </button>

            {/* Display the number of likes */}
            {likes}

        </div>
    );
};

export default Likes;

{/* 
const [count, setCount] = useState(initialLikes) // Initial value of 0
<button onClick={() => setCount((count) => count + 1)}>
    count is {count}
</button> 
*/}