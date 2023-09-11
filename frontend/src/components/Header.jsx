import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from "react-router-dom"


function Header() {
    return (
        <>

            <header className='header'>

                <div className="buttons">
                    
                    <Link to='/'>
                        HOME 
                    </Link>
                    <br/>
                    <Link to='/user'>
                        My Dashboard 
                    </Link>

                </div>

                <div className='logo'>
                    <img src='images/wide-miranda-logo-transparent.png' alt='logo' width='300px' />
                </div>

                <div className="buttons">
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                    <br />
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                    <br />
                    <Link >
                        <FaSignOutAlt /> Logout
                    </Link>
                </div>

            </header>
        </>
    )
}

export default Header