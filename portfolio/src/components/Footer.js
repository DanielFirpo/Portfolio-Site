import React, { useEffect, useState } from 'react';

import { Link, animateScroll as scroll } from "react-scroll";

function Footer() {

    return (
        <div id="footer">
            <Link to="nav-home" spy={true} smooth={true} offset={0} duration={500}><div id="back-to-top"></div></Link>
            <div>
                <div id="footer-links">
                    <a href="https://www.linkedin.com/in/daniel-firpo/" target="_blank"><div className="footer-link" id="linkedin-icon" /></a> {/*LinkedIn*/}
                    <a href="https://github.com/danielfirpo" target="_blank"><div className="footer-link" id="github-icon" /></a> {/*GitHub*/}
                    <a href="https://twitter.com/DanielFirpo2" target="_blank"><div className="footer-link" id="twitter-icon" /></a> {/*Twittah*/}
                </div>
                <div className="copyright" id="signature">DANIEL FIRPO · 2023</div>
            </div>
        </div>
    );

}

export default Footer;
