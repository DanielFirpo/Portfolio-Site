import React, { useEffect, useState } from 'react';

function Contact() {

    const [successId, setSuccessId] = useState("success-hidden");

    return (
        <div id="nav-contact">
            <svg preserveAspectRatio="none" viewBox="0 0 100 102" height="75" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" class="svgcolor-light">
                <path d="M0 0 L50 100 L100 0 Z" fill="#f5f5f5" stroke="#f5f5f5"></path>
            </svg>
            <section className="page-section" id="contact">
                <div className="section-title-container">
                    <div id="contact-title" className="section-title">CONTACT</div>
                    <div id="contact-title-underline" className="section-title-underline"></div>
                </div>

                <div id="contact-subtitle">Have a question or want to work together? Email me!</div>

                <form id="contact-form" name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="text" name="name" placeholder="Your Name" className="contact-form-input" id="name"></input>
                    <input type="email" name="email" placeholder="Your Email Address" className="contact-form-input" id="email"></input>
                    <textarea type="text" name="message" placeholder="Your Message" className="contact-form-input" id="message"></textarea>
                    <div id={successId}><div id="success-text">Your message was sent successfully. Thanks!</div><div onClick={() => {setSuccessId("success-hidden")}} id="success-close"></div></div>
                    <button type="submit" onClick={() => {setSuccessId("success")}} className="button" id="submit-button">SUBMIT</button>
                </form>

                <div id="contact-methods">
                    Or email me manually at<br/>
                    <br/>
                    <a id="contact-email" href="mailto:DanielFirpoDev@gmail.com" target="_blank" rel="noopener noreferrer">DanielFirpoDev@gmail.com</a>
                </div>

            </section>
        </div>
    );

}

export default Contact;
