import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { BsHouseDoorFill, BsEmojiSunglassesFill } from "react-icons/bs";


function Header() {

    return (
        <>
            {/* Define the header section */}
            <header className='header'>

                <div>

                    <Link to='/'>
                        <BsHouseDoorFill /> HOME
                    </Link>
                    <br />
                    <br />
                    <Link to='/user'>
                        <BsEmojiSunglassesFill />  My Dashboard
                    </Link>

                </div>

                {/* Create a link to the home page with the logo */}
                <Link to='/'>
                    <img className='iconBtns'
                        src='images/wide-miranda-logo-transparent.png'
                        alt='logo'
                        width='300px'
                    />
                </Link>

                <div>

                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                    <br />
                    <br />
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>

                    {/* <Link>
                        <FaSignOutAlt /> Logout
                    </Link> */}

                </div>

            </header>
        </>
    )
}

export default Header