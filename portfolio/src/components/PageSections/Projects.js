import React, { useEffect, useState } from 'react';

import CovidTracker from "../../images/covid-tracker.PNG"
import Tally from "../../images/tally.PNG"
import DigDug from "../../images/digdug.png"
import PyCity from "../../images/pycity.PNG"
import PennyTrader from "../../images/pennytrader.PNG"
import IWDLiveview from "../../images/IWDLiveview.PNG"

import { Icon } from '@iconify/react';

function About() {

    const [selectedProject, setSelectedProject] = useState(undefined);

    function disableScrolling() {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () {
            window.scrollTo(x, y);
        };
    }

    function enableScrolling() {
        window.onscroll = function () { };
    }

    useEffect(() => {
        //lock scroll when project inspect screen open
        if (selectedProject) {
            disableScrolling();
        }
        else {
            enableScrolling();
        }

        return () => {
            disableScrolling();
        }
    }, [selectedProject])

    let iwdLiveviewProject = {
        title: "IWD Liveview",
        subtitle: "A POPULAR WEBSITE THAT I COMPLETELY REVAMPED.",
        text: "A popular live streamer's \"Live View\" website. The live streamer likes to watch Esports events, but is not always allowed rights to rebroadcast them on stream. This site solves that issue by having everyone watch the event on their own PC, and it automatically synchronizes their players to the live streamer's playback position. This site averages about 2000 users on days it is needed. Made with React and Django.",
        image: IWDLiveview,
        site: "https://iwdlive.com/caster/iwd",
        github: "https://github.com/stream-sync/iwdsync"
    }

    let covidProject = {
        title: "Covid-19 Tracker",
        subtitle: "UP TO DATE INFO, ALL IN ONE PLACE.",
        text: "Up to date info on testing, confirmed cases, and deaths for US states and counties all in one place. Contributed to the project as a front end developer by making sure every detail matched the design doc. Used Plotly, HTML, and CSS.",
        image: CovidTracker,
        site: undefined,//"https://ncov19.us/" no longer hosted
        github: "https://github.com/DanielFirpo/front-end"
    }

    let tallyProject = {
        title: "Tally AI",
        subtitle: "UNLOCK YOUR BUSINESS DATA.",
        text: "View your business's reputation as a whole, from review analytics. Built with React, Redux, Express, and Postgres. Contributed to the dashboard's widgets system, tab system, and many other frontend features using React, Redux, HTML, and CSS.",
        image: Tally,
        site: "https://www.tallyai.online/",
        github: "https://github.com/DanielFirpo/tally-ai-fe"
    }

    let digdugProject = {
        title: "Dig Dug Clone",
        subtitle: "YOUR FAVORITE RETRO ARCADE GAME, NOW PLAYABLE IN THE BROWSER!",
        text: "A recreation of the classic retro arcade game \'Dig Dug.\' Made entirely on my own with Unity/C# to practice my problem solving skills.",
        image: DigDug,
        site: "https://turtled.itch.io/dig-dug",
        github: "https://github.com/DanielFirpo/DigDug"
    }

    let pycityProject = {
        title: "PyCity",
        subtitle: "EXPLORE A PROCEDURALLY GENERATED CITY WITH FRIENDS",
        text: "A multiplayer, procedurally generated dungeon crawler game. Made with React and Django in 1 week. Contributed to the frontend visualization/animations using HTML5 canvas.",
        image: PyCity,
        site: undefined,// "https://pycity.netlify.com/", no longer hosted
        github: "https://github.com/DanielFirpo/FrontEnd"
    }

    let pennyProject = {
        title: "Coin Trader",
        subtitle: "AN ECOMMERCE SITE SPECIALIZING IN SELLING RARE COINS",
        text: "A fully-featured ecommerce site. Made with React, Express and MySQL. Made entirely on my own in 3 months.",
        image: PennyTrader,
        site: "https://pennytrader.shop",
        github: "https://github.com/DanielFirpo/penny-trader-fe"
    }



    return (
        <div id="nav-projects">
            <section className="page-section" id="projects">
                <div className="section-title-container">
                    <div className="section-title">PROJECTS</div>
                    <div className="section-title-underline"></div>
                </div>

                <div id="tap-for-info">Tap for info</div>

                <div id="project-list">
                    <div onClick={() => { setSelectedProject(iwdLiveviewProject) }} id="iwd-project" className="project-container">
                        <div style={{ position: "relative" }}><div className='project-live-container'><Icon className='project-live-icon' icon="fluent:live-20-filled" color="white" /><div className='project-live'>LIVE DEMO</div></div></div>
                        <div className="project">
                            <h3 className="project-title">IWD Liveview</h3>
                            <h6 className="project-subtitle">React / Tailwind / Django</h6>
                            <div className="learn-more-button">LEARN MORE</div>
                        </div>
                    </div>
                    <div onClick={() => { setSelectedProject(tallyProject) }} id="tally-project" className="project-container">
                        <div style={{ position: "relative" }}><div className='project-live-container'><Icon className='project-live-icon' icon="fluent:live-20-filled" color="white" /><div className='project-live'>LIVE DEMO</div></div></div>
                        <div className="project">
                            <h3 className="project-title">Tally AI</h3>
                            <h6 className="project-subtitle">React / Redux / Express</h6>
                            <div className="learn-more-button">LEARN MORE</div>
                        </div>
                    </div>
                    <div onClick={() => { setSelectedProject(pennyProject) }} id="penny-project" className="project-container">
                        <div style={{ position: "relative" }}><div className='project-live-container'><Icon className='project-live-icon' icon="fluent:live-20-filled" color="white" /><div className='project-live'>LIVE DEMO</div></div></div>
                        <div className="project">
                            <h3 className="project-title">Coin Trader</h3>
                            <h6 className="project-subtitle">React / Express</h6>
                            <div className="learn-more-button">LEARN MORE</div>
                        </div>
                    </div>
                    <div onClick={() => { setSelectedProject(covidProject) }} id="covid-project" className="project-container">
                        <div className="project">
                            <h3 className="project-title">Covid Tracker</h3>
                            <h6 className="project-subtitle">Plotly / Python</h6>
                            <div className="learn-more-button">LEARN MORE</div>
                        </div>
                    </div>
                    <div onClick={() => { setSelectedProject(digdugProject) }} id="digdug-project" className="project-container">
                        <div style={{ position: "relative" }}><div className='project-live-container'><Icon className='project-live-icon' icon="fluent:live-20-filled" color="white" /><div className='project-live'>LIVE DEMO</div></div></div>
                        <div className="project">
                            <h3 className="project-title">Dig Dug Clone</h3>
                            <h6 className="project-subtitle">Unity / C#</h6>
                            <div className="learn-more-button">LEARN MORE</div>
                        </div>
                    </div>
                    <div onClick={() => { setSelectedProject(pycityProject) }} id="pycity-project" className="project-container">
                        <div className="project">
                            <h3 className="project-title">PyCity</h3>
                            <h6 className="project-subtitle">React / Django</h6>
                            <div className="learn-more-button">LEARN MORE</div>
                        </div>
                    </div>
                    {/* <div className="empty-project"></div> */}
                </div>

                {
                    selectedProject ? (
                        <div onClick={() => { setSelectedProject(undefined) }} id="project-popup">
                            <div onClick={(e) => { e.stopPropagation() }} id="project-popup-contents">
                                <img src={selectedProject.image} id="project-popup-image"></img>
                                <div id="project-popup-info">
                                    <div id="project-popup-title">{selectedProject.title}</div>
                                    <div id="project-popup-subtitle">{selectedProject.subtitle}</div>
                                    <div id="project-popup-text">{selectedProject.text}</div>
                                    <div id="project-popup-controls">
                                        <div id="project-popup-link-list">
                                            {
                                                selectedProject.site != undefined ?
                                                    (
                                                        <div><a href={selectedProject.site} target="_blank">View Site</a></div>
                                                    ) : (<></>)
                                            }
                                            <div><a href={selectedProject.github} target="_blank">GitHub</a></div>
                                            {/* <a>Other</a> */}
                                        </div>
                                        <div onClick={() => { setSelectedProject(undefined) }} id="project-popup-close"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }

            </section>
        </div>
    );

}

export default About;
