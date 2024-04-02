import React from 'react';
import NavLinks from './NavLinks';

const Navigation = (props) => {
    return (
        <nav className="navigation">
            <NavLinks {...props} />
        </nav>
    )
}

export default Navigation;