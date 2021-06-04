import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({loggedInUser}) => {
  let[isUserLoggedIn, setUserLoggedIn] = useState()


  useEffect(() => {
    setUserLoggedIn(loggedInUser)
  }, [loggedInUser])

  return (
    <nav>
      <div className='title'>
        <h1>DigiChat</h1>
      </div>
      <ul className='linksList'>
        <li className='profile'>
          <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
        </li>
        {isUserLoggedIn ? null : <li className='login'>
          <Link to='/login' style={{ textDecoration: 'none' }} >Login</Link>
        </li>}
        {isUserLoggedIn ? <li className='/login'>
          <Link to='/login'>Logout</Link>
        </li> : null}
        
        <li className='signup'>
          <Link to='/signup' style={{ textDecoration: 'none' }} >SignUp</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation