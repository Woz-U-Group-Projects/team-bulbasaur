import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({isLoggedIn, onLogout, setProfile, loggedInUser}) => {
  let[isUserLoggedIn, setUserLoggedIn] = useState()


  useEffect(() => {
    setUserLoggedIn(isLoggedIn)
  }, [isLoggedIn])

  return (
    <nav>
      <div className='title'>
        <h1>DigiChat</h1>
      </div>
      <ul className='linksList'>
        <li className='signup'>{
            isUserLoggedIn ? 
            <Link to='/profile' onClick={() => setProfile(loggedInUser)} style={{ textDecoration: 'none' }}>Profile</Link> : 
            <Link to='/signup' style={{ textDecoration: 'none' }} >SignUp</Link>
        }</li>

        <li className='/login'>{
          isUserLoggedIn ? 
          <Link onClick={() => onLogout()} style={{ textDecoration: 'none' }} to='/login'>Logout</Link> : 
          <Link to='/login' style={{ textDecoration: 'none' }} >Login</Link>
        }</li>

        <li className='profile'>
          <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation