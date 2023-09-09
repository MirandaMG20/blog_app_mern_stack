import React from 'react'
import logo from '../../../public/images/wide-miranda-logo-transparent.png'
// import { Header } from '../../components/header/Header'

function Header() {
    return (
        <>
            <header>
                <div className=''>
                    <div className=''>
                        <img src={logo} alt='logo' width='300px' />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header