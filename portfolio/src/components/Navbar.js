import React, { useEffect, useState } from 'react';

import { Link, animateScroll as scroll } from "react-scroll";

function Navbar() {

    useEffect(() => {
        window.addEventListener('scroll', updateNavbarState)
    }, [])

    const [navClass, setNavClass] = useState(" relative");
    const [navOpen, setNavOpen] = useState(false);

    let navRef = React.createRef();

    return (
        <div ref={navRef} className={navClass + "-navbar-container"}>
            <div className={"navbar" + navClass}>
                <Link activeClass="active" to="nav-home" spy={true} smooth={true} offset={0} duration={500}><div className="navbar-item">HOME</div></Link>
                <Link activeClass="active" to="nav-about" spy={true} smooth={true} offset={-50} duration={500}><div className="navbar-item">ABOUT</div></Link>
                <Link activeClass="active" to="nav-skills" spy={true} smooth={true} offset={-50} duration={500}><div className="navbar-item">SKILLS</div></Link>
                <Link activeClass="active" to="nav-projects" spy={true} smooth={true} offset={-35} duration={500}><div className="navbar-item">PROJECTS</div></Link>
                <Link activeClass="active" to="nav-contact" spy={true} smooth={true} offset={50} duration={500}><div className="navbar-item">CONTACT</div></Link>
            </div>
            <div className={"mobile-navbar" + navClass}>
                <div onClick={() => { setNavOpen(!navOpen) }} id="hamburger"></div>
            </div>
            {
                navOpen ? (
                    <div>

                        <div id="mobile-nav-contents">
                            <Link onClick={() => { setNavOpen(false) }} activeClass="active" to="nav-home" spy={true} smooth={true} offset={0} duration={500}><div className="mobile-navbar-item">HOME</div></Link>
                            <Link onClick={() => { setNavOpen(false) }} activeClass="active" to="nav-about" spy={true} smooth={true} offset={-50} duration={500}><div className="mobile-navbar-item">ABOUT</div></Link>
                            <Link onClick={() => { setNavOpen(false) }} activeClass="active" to="nav-skills" spy={true} smooth={true} offset={-50} duration={500}><div className="mobile-navbar-item">SKILLS</div></Link>
                            <Link onClick={() => { setNavOpen(false) }} activeClass="active" to="nav-projects" spy={true} smooth={true} offset={-35} duration={500}><div className="mobile-navbar-item">PROJECTS</div></Link>
                            <Link onClick={() => { setNavOpen(false) }} activeClass="active" to="nav-contact" spy={true} smooth={true} offset={50} duration={500}><div className="mobile-navbar-item">CONTACT</div></Link>

                        </div>
                        <div onClick={() => { setNavOpen(!navOpen) }} id="open-hamburger"></div>
                    </div>
                ) : (
                        <></>
                    )
            }
            <div className="navbar-placeholder"></div>
        </div>
    );

    function updateNavbarState() {

        if (window.pageYOffset > window.innerHeight) {
            setNavClass(" fixed");
        }
        else {
            setNavClass(" relative")
        }
    }

}

export default Navbar;
