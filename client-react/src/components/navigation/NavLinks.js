import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


const NavLinks = ({isLoggedIn, onLogout, onGetProfile, loggedInUser, isMobile, closeMobileMenu}) => {

    let[isUserLoggedIn, setUserLoggedIn] = useState();
  
    useEffect(() => {
      setUserLoggedIn(isLoggedIn)
    }, [isLoggedIn])

    return (
        <header>
            <nav>
                <ul id='nav'>
                    <li className='logo'>
                        <h1 className="logo-text"><span>Digi</span>Chat</h1>
                    </li>
                    <li className='profile' onClick={() => isMobile && closeMobileMenu()}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='signup' onClick={() => isMobile && closeMobileMenu()}>{
                        isUserLoggedIn ?
                            <Link to='/profile' onClick={() => onGetProfile(loggedInUser.id)}>Profile</Link> :
                            <Link to='/signup'>SignUp</Link>}
                    </li>

                    <li className='login' onClick={() => isMobile && closeMobileMenu()}>
                        { 
                        isUserLoggedIn ?
                            <Link onClick={() => onLogout()} to='/login'>Logout</Link> :
                            <Link to='/login'>Login</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavLinks;