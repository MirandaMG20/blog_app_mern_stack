import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { BsHouseDoorFill, BsCardText } from "react-icons/bs";


function Header() {

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

                    {/* <Link>
                        <FaSignOutAlt /> Logout
                    </Link> */}

                </div>

            </header>
        </>
    )
}

export default Header