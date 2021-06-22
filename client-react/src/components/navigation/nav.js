import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//CSS
import './nav.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

// const Navigation = ({isLoggedIn, onLogout, onGetProfile, loggedInUser}) => {
//   let[isUserLoggedIn, setUserLoggedIn] = useState()


//   useEffect(() => {
//     setUserLoggedIn(isLoggedIn)
//   }, [isLoggedIn])

//   const myFunction = () => {
//     let navbar = document.getElementById('nav');
//     navbar.classList.toggle('show');
//   }

//   return (
//     <header>
//       <div className='toggle-btn' onClick={() => myFunction()}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>

//       <div className='title'>
//         <h1>DigiChat</h1>
//       </div>

//       <nav id='nav'>
//         <ul className='linksList'>
//           <li className='profile'>
//             <Link to='/' style={{ textDecoration: 'none' }} >Home</Link>
//           </li>
//           <li className='signup'>{
//               isUserLoggedIn ? 
//               <Link to='/profile' onClick={() => onGetProfile(loggedInUser.id)} style={{ textDecoration: 'none' }}>Profile</Link> : 
//               <Link to='/signup' style={{ textDecoration: 'none' }} >SignUp</Link>
//           }</li>

//           <li className='/login'>{
//             isUserLoggedIn ? 
//             <Link onClick={() => onLogout()} style={{ textDecoration: 'none' }} to='/login'>Logout</Link> : 
//             <Link to='/login' style={{ textDecoration: 'none' }} >Login</Link>
//           }</li>
//         </ul>
//       </nav>
//     </header>
            
//   )
// }


const Navigation = ({isLoggedIn, onLogout, onGetProfile, loggedInUser}) => {
  let[isUserLoggedIn, setUserLoggedIn] = useState()
  

  useEffect(() => {
    setUserLoggedIn(isLoggedIn)
  }, [isLoggedIn])

  const openMenu = () => {
    let navbar = document.getElementById('nav');
    navbar.classList.toggle('show');
  }

  const closeMenu = () => {
    let navbar = document.getElementById('nav');
    navbar.classList.toggle('nav');
  }

  library.add(faBars);

  return (
    <header>
      <div className='logo'>
        <h1 className="logo-text"><span>Digi</span>Chat</h1>
      </div>

      <FontAwesomeIcon className="menu-toggle" icon="bars" onClick={() => openMenu()} />

      <ul id='nav'>
        <li className='profile'>
          <Link to='/' onClick={() => closeMenu()}>Home</Link>
        </li>
        <li className='signup' onClick={() => closeMenu()}>{
          isUserLoggedIn ? 
          <Link to='/profile' onClick={() => onGetProfile(loggedInUser.id)}>Profile</Link> : 
          <Link to='/signup'>SignUp</Link>}
        </li>

        <li className='/login'>{
          isUserLoggedIn ? 
          <Link onClick={() => onLogout()} to='/login'>Logout</Link> : 
          <Link to='/login' onClick={() => closeMenu()}>Login</Link>
        }</li>
      </ul>
    </header>
            
  )
}

export default Navigation