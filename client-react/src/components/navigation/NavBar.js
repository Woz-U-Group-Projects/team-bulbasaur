import React from 'react';
import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'

const NavBar = (props) => {
    return (
        <div className="NavBar">
            <Navigation {...props} />
            <MobileNavigation />
        </div>
    )
}

export default NavBar;