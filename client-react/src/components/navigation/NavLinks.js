import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import './NavBar.css'


const NavLinks = (props) => {
    let { isLoggedIn, onLogout, onGetProfile, loggedInUser, isMobile, closeMobileMenu } = props

    let [isUserLoggedIn, setUserLoggedIn] = useState();

    library.add(faUser, faUserPlus, faEdit, faTrashAlt, faThumbsUp, faThumbsDown, faCommentDots, faUserCircle);

    useEffect(() => {
        setUserLoggedIn(isLoggedIn)
    }, [isLoggedIn])

    return (
        <header>
            <div className='logo'>
                <h1 className="logo-text"><span>Digi</span>Chat</h1>
            </div>
            <nav>
                <ul id='nav'>


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

                    {/* <li className="groups"
                        onClick={() => alert()}
                    >Groups</li> */}
                </ul>
            </nav>
            <div className='user' style={loggedInUser ? { display: 'inline' } : { display: 'none' }}>
                <FontAwesomeIcon className="online-user-icon" icon="user-circle" />
                {loggedInUser ? loggedInUser.userName : null}
            </div>
        </header>
    )
}

export default NavLinks;