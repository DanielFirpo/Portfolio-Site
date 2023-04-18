import React, { useEffect, useState } from 'react';
import GameLoop from "../GameLogic/GameLoop"

import * as GameStates from "../GameLogic/GameStates"

import { Link } from "react-scroll";
import ArrowIcon from "../images/arrow-right-icon.svg";

let gameLoop;//need to declare outside of Game() cause otherwise we'll lose reference to it and it will keep looping forever, never being garbage collected

function Game() {

    const MOBILE_BREAKPOINT = 530;

    let originalText = "Hello, my name is Daniel. Welcome to my portfolio.\nCheck out ⪼my projects⪻. Or, contact me ⪼here⪻.\n\nYou can also press Play to destroy this text!";

    //use ⪼ character to start a link
    //use ⪻ character to end a link
    const [gameText, setGameText] = useState(originalText);

    //add href values here. When links are parsed, it will map these to each pair of ⪼ ⪻ characters, based on index
    let hrefs = ["nav-projects", "nav-contact"]

    const [canvas, setCanvas] = useState();
    const [gameState, setGameState] = useState(GameStates.GAME_NOT_STARTED);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    let canvasRef = React.createRef();
    let canvasContainerRef = React.createRef();

    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'div') return;
        autoExpand(event.target);
    }, false);

    var autoExpand = function (field) {

        // Reset field height
        field.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';

    };

    useEffect(() => {
        setCanvas(canvasRef.current);
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', updateWindowSize)
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        updateWindowSize();
        return () => {
            window.removeEventListener('resize', updateWindowSize)
        }
    }, [])

    useEffect(() => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        //end game if screen reduced to mobile size
        if (window.innerWidth < 530) {
            if (gameLoop) setGameStateCallback(GameStates.GAME_NOT_STARTED);
        }
    }, [windowSize])

    // useEffect(() => {
    //     console.log("gameText changed", gameText);
    //     // var sel = window.getSelection();
    //     // if(sel.){
    //     //     caretPos = sel.anchorOffset;
    //     // }
    //     try {
    //         var range = document.createRange();
    //         var sel = window.getSelection();
    //         range.setStart(sel.anchorNode, caretPos);
    //         // console.error(sel.anchorNode);
    //         range.collapse(true);
    //         sel.removeAllRanges();
    //         sel.addRange(range);
    //     } catch { }
    // }, [gameText])

    function setGameStateCallback(newGameState) {
        if (newGameState === GameStates.GAME_END_LOSS || newGameState === GameStates.GAME_END_WIN) {//only allowed to transition to game end while GAMEINPROGRESS
            if (gameState === GameStates.GAME_IN_PROGRESS) {
                gameLoop.stopLoop();
                setGameState(newGameState);
            }
        } else {
            setGameState(newGameState);
        }
        if (newGameState === GameStates.GAME_NOT_STARTED) {
            gameLoop.stopLoop();
        }
    }

    function updateWindowSize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    let splitGameText = []//gameText but split where links were found and link names deleted
    let gameTextLinks = []//array of a elements

    let readingLink = false;
    let currentLinkText = "";
    let lastLinkEndIndex = 0;
    for (let i = 0; i < gameText.length; i++) {

        if (gameText[i] === "⪻") {//end of link or end of text
            lastLinkEndIndex = i + 1;
            //if(currentLinkText === "my projects" || currentLinkText === "here") {
            gameTextLinks.push(currentLinkText);
            //}
            currentLinkText = "";
            readingLink = false;
        }
        if (readingLink) {
            currentLinkText += gameText[i];
        }
        if (gameText[i] === "⪼") {//start of link
            readingLink = true;
            //console.log("Parsing link, text before: ", gameText.substring(lastLinkEndIndex, gameText[i - 1]), "game text:", gameText, "substring start:", lastLinkEndIndex, "end:", i - 1)
            splitGameText.push(gameText.substring(lastLinkEndIndex, i));
        }
        if (i === gameText.length - 1) {//end of gameText
            splitGameText.push(gameText.substring(lastLinkEndIndex, i + 1));
        }


    }

    function onLinkClick(e) {
        window.location.href = e.target.getAttribute("href");
    }

    function formatGameText() {



        let linkTextIndex = 0;
        let gameTextIndex = 0;

        let result = []

        for (let i = 0; i < splitGameText.length + gameTextLinks.length; i++) {
            if (i % 2 === 0) {
                let text = splitGameText[gameTextIndex];
                gameTextIndex++;
                result.push(text);
            }
            else {
                // <Link activeClass="active" to="nav-projects" spy={true} smooth={true} offset={-30} duration={500}>
                let link = <Link activeClass="active" spy={true} smooth={true} offset={20} duration={500} style={{ height: "1px" }} className="gameTextLink hover-shadow hover-color" to={hrefs[linkTextIndex]}>{gameTextLinks[linkTextIndex]}</Link>;
                linkTextIndex++;
                result.push(link);
            }
        }

        return result;
    }

    function deformatGameText(innerHTML) {

        let readingElement = false;
        let result = ""

        for (let i = 0; i < innerHTML.length; i++) {
            if (innerHTML[i] === "<" && innerHTML[i + 1] !== "/") {
                result += "⪼";
                readingElement = true;
            }
            if (innerHTML[i] === "<" && innerHTML[i + 1] === "/") {
                result += "⪻";
                readingElement = true;
            }
            else if (innerHTML[i] === ">") {
                readingElement = false;
            }
            else if (!readingElement) {
                result += innerHTML[i];
            }
        }
        return result;
    }

    //console.log("result:" + formatGameText())

    //chrome by default will do weird shit like adding more divs inside of the contenteditable div after pressing enter, lets prevent that.
    function customEnterBehaviour(e) {
        if (e.keyCode === 13) {
            document.execCommand('insertHTML', false, '\n');
            e.preventDefault();
        }
        // if (e.keyCode === 8) {
        //     e.preventDefault();
        // }
    }

    switch (gameState) {
        case GameStates.GAME_NOT_STARTED:
            return (

                windowSize.width > MOBILE_BREAKPOINT ?

                    <div id="nav-home">
                        <div id="preGame">
                            {/* <div><textarea cols="40" id="preGameText" onChange={(e) => { setGameText(e.target.value) }}>{gameText}<a > test</a></textarea></div> */}
                            <span id="preGameText" onKeyUp={(e) => {
                            }} onInput={(e) => {
                                //super hacky but it fixes a bug, so.....
                                // var sel = window.getSelection();
                                // caretPos = sel.focusOffset;
                                // node = e.target;
                                // console.error(e.target)
                                // setGameText(e.target.textContent);//deformatGameText(e.target.innerHTML.replace(/<br>/g, "").replace(/<div>/g, "").replace(/<\/div>/g, ""))
                                //setGameText(deformatGameText(e.target.innerHTML.replace(/<br>/g, "").replace(/<div>/g, "").replace(/<\/div>/g, "")))
                            }} onKeyDown={(e) => { customEnterBehaviour(e) }}>
                                {
                                    gameText.includes("⪻") || gameText.includes("⪼") ?
                                        formatGameText().map((textOrLink) => {
                                            return textOrLink;
                                        })
                                        :
                                        gameText
                                }
                            </span>
                            <div class="columnPadding"></div>
                            <div id="playButtonContainer">
                                <div><button onClick={(e) => { setGameState(GameStates.GAME_IN_PROGRESS); updateWindowSize(); }}>Play</button></div>
                                {/* <div><button onClick={(e) => { setGameText(originalText) }}>Reset</button></div> */}
                            </div>
                        </div>
                    </div>

                    :

                    <div id="nav-home-mobile">
                        <span>
                            Hello, I'm <span id="home-name">Daniel Firpo</span>.
                            <br />
                            I'm a full stack web developer.
                        </span>
                        <div>
                            <Link activeClass="active" spy={true} smooth={true} offset={20} duration={500} style={{ height: "1px" }} to="nav-about">
                                <button id="view-my-work-button" className="button">
                                    View my work <img id="arrow-right-icon" src={ArrowIcon}></img>
                                </button>
                            </Link>
                        </div>
                    </div>

            );
        case GameStates.GAME_IN_PROGRESS:
            if (canvas) {
                if (gameLoop) {
                    gameLoop.stopLoop();
                }
                gameLoop = new GameLoop(canvas, gameText.replace(/⪼/g, "").replace(/⪻/g, ""), setGameStateCallback);
                gameLoop.startLoop();
            }
            return (
                <div id="nav-home">
                    <div ref={canvasContainerRef} id="canvas-container"><canvas style={{ width: "100%", height: "100%" }} onTouchMove={(e) => { if (gameLoop) gameLoop.updateMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY }); }} onMouseMove={(e) => { if (gameLoop) gameLoop.updateMousePosition({ x: e.pageX, y: e.pageY }) }} ref={canvasRef} id="game"></canvas></div>
                </div>
            );
        case GameStates.GAME_END_LOSS:
            return (
                <div class="gameOver">
                    <h1>GAME OVER</h1>
                    <div class="columnPadding"></div>
                    <button class="continueButton" onClick={(e) => { e.preventDefault(); setGameState(GameStates.GAME_NOT_STARTED) }}>Continue</button>
                </div>
            );
        case GameStates.GAME_END_WIN:
            return (
                <div class="gameOver">
                    <h1>YOU WON</h1>
                    <div class="columnPadding"></div>
                    <button class="continueButton" onClick={(e) => { setGameState(GameStates.GAME_NOT_STARTED) }}>Continue</button>
                </div>
            );
    }
}

export default Game;

//  // to count each character
//  var charIndex = 0;
//  // find the top ypos and then move down half a char space
//  var yPos = centerY - fontSize * line.length * 0.5 * textVertSpacing + fontSize * textVertSpacing / 2;

//  for (var i = 0; i < line.length; i++) {
//    // get the width of the whole line
//    var width = ctx.measureText(line[i]).width;
//    // use the width to find start
//    var textPosX = centerX - width / 2;
//    for (var j = 0; j < line[i].length; j++) {
//      // get char
//      var char = line[i][j];
//      // get its width
//      var cWidth = ctx.measureText(char).width;
//      // check if char needs to fade
//      if (fade.indexOf(charIndex) > -1) {
//        ctx.globalAlpha = 0.5;
//      } else {
//        ctx.globalAlpha = 1;
//      }
//      // draw the char offset by half its width (center)
//      ctx.fillText(char, textPosX + cWidth / 2, yPos);
//      // move too the next pos
//      textPosX += cWidth;
//      // count the char
//      charIndex += 1
//    }
//    // move down one line
//    yPos += fontSize * textVertSpacing;
//  }
// }
