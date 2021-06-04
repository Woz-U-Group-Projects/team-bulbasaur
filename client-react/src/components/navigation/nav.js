import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <div className='title'>
        <h1>DigiChat</h1>
      </div>
      <ul className='linksList'>
        <li className='profile'>
          <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
        </li>
        <li className='login'>
          <Link to='/login' style={{ textDecoration: 'none' }} >Login</Link>
        </li>
        <li className='signup'>
          <Link to='/signup' style={{ textDecoration: 'none' }} >SignUp</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation