import React from 'react';
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'

const NavBar = () => {
    return (
        <div className="NavBar">
            <Navigation />
            <MobileNavigation />
        </div>
    )
}

export default NavBar;