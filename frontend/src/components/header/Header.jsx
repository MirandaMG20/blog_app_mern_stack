import React from 'react'
import logo from '../../../public/images/wide-miranda-logo-transparent.png'
import { Link } from "react-router-dom"

function Header() {
    return (
        <>
            <header className='header'>
                <div className=''>
                    <div className='logo'>
                       
                        <img src={logo} alt='logo' width='300px' />
                        
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header