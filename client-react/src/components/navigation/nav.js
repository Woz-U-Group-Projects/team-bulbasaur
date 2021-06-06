import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({isLoggedIn, onLogout}) => {
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
        {isUserLoggedIn ? null : <li className='signup'>
          <Link to='/signup' style={{ textDecoration: 'none' }} >SignUp</Link>
        </li>}
        {isUserLoggedIn ? null : <li className='login'>
          <Link to='/login' style={{ textDecoration: 'none' }} >Login</Link>
        </li>}
        {isUserLoggedIn ? <li className='/login'>
          <Link onClick={() => onLogout()} style={{ textDecoration: 'none' }} to='/login'>Logout</Link>
        </li> : null}
        <li className='profile'>
          <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation