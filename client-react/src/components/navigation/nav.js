import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//CSS
import './nav.css'

const Navigation = ({isLoggedIn, onLogout, setProfile, loggedInUser}) => {
  let[isUserLoggedIn, setUserLoggedIn] = useState()


  useEffect(() => {
    setUserLoggedIn(isLoggedIn)
  }, [isLoggedIn])

  const myFunction = () => {
    let navbar = document.getElementById('nav');
    navbar.classList.toggle('show');
  }

  return (
    <header>
      <div className='toggle-btn' onClick={() => myFunction()}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className='title'>
        <h1>DigiChat</h1>
      </div>

      <nav id='nav'>
        <ul className='linksList'>
          <li className='profile'>
            <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
          </li>
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
        </ul>
      </nav>
    </header>
  )
}

export default Navigation