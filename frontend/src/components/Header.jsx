import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { nav } from '../data/data'

function Header() {
    return (
        <>

            <header className='header'>

                <div className="buttons">
                    <Link to='/home'>
                        HOME
                    </Link>
                    {/* <ul>
                        {nav.map((link) => (
                            <li key={link.id}>
                                <Link to={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul> */}
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