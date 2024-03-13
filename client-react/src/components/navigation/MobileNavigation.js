import React from 'react';
import NavLinks from './NavLinks';
import {CgMenuRound} from 'react-icons/cg';
import {CgCloseO} from 'react-icons/cg';
import {useState} from 'react';

const MobileNavigation = (props) => {

    const [open, setOpen] = useState(false);

    const hamburgerIcon =   <CgMenuRound 
                                className="hamburger" 
                                size="40px" 
                                color="white" 
                                onClick = {() => setOpen(!open)}
                            />
    const closeIcon =   <CgCloseO 
                            className="hamburger" 
                            size="40px" 
                            color="white" 
                            onClick = {() => setOpen(!open)}
                        />

    const closeMobileMenu = () => setOpen(false)

    return (
        <nav className="mobile-navigation">
            {open ? closeIcon : hamburgerIcon}    
            {open && <NavLinks {...props} isMobile={true} closeMobileMenu={closeMobileMenu}/> }
        </nav>
    )
}

export default MobileNavigation;

