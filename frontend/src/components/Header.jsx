import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory to redirect after logout
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa' 
import { BsHouseDoorFill, BsCardText } from "react-icons/bs";


function Header() {

    // const navigate = useNavigate(); // Initialize history

    // // Logout function
    // const handleLogout = () => {
    //     console.log('Logout clicked');
    //     // Remove user data from localStorage
    //     localStorage.removeItem('user');
    //     // Redirect to the login page after logout
    //     navigate('/login');
    // };

    return (
        <>

            <header className='header'>

                <div>

                    <Link to='/'>
                        <BsHouseDoorFill /> HOME
                    </Link>
                    <br />
                    <Link to='/user'>
                        <BsCardText />  My Dashboard
                    </Link>

                </div>

                <div>
                    <img
                        src='images/wide-miranda-logo-transparent.png'
                        alt='logo'
                        width='300px'
                    />
                </div>

                <div>

                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                    <br />

                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                    <br />

                    <Link>
                        {/* onClick={handleLogout} */}
                        <FaSignOutAlt /> Logout
                    </Link>

                </div>

            </header>
        </>
    )
}

export default Header