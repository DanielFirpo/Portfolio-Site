import React, { useEffect, useState } from 'react';

function About() {

    return (
        <div id="nav-skills">
            <section className="page-section" id="skills">
                <div className="section-title-container">
                    <div className="section-title">SKILLS</div>
                    <div className="section-title-underline"></div>
                </div>

                <div className="section-title-container">
                    <div id="skills-title" className="small-title">Here are some of my favorite languages and frameworks to work with:</div>
                </div>

                <div id="skill-list">
                    <div className="skill-container">
                    <div className="skill">React</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" /> */}
                    <div className="skill">Javascript</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" /><div className="skill-offset" />*/}
                    <div className="skill">CSS/Sass/LESS</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /> */}
                    <div className="skill">HTML</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" />*/}
                    <div className="skill">Tailwind CSS</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" />*/}
                    <div className="skill">Node.js</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container">
                    <div className="skill">Express.js</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" /> */}
                    <div className="skill">Unity</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" /><div className="skill-offset" /><div className="skill-offset" />*/}
                    <div className="skill">C#</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>

                    <div className="skill-container"> {/* <div className="skill-offset" /><div className="skill-offset" />*/}
                    <div className="skill">Java</div><div className="skill-bar"/><div className="skill-checkmark"></div></div>
                </div>

            </section>
        </div>
    );

}

export default About;
