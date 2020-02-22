import Char from "../GameLogic/Char";
import Paddle from '../GameLogic/Paddle';
import Ball from '../GameLogic/Ball';
import Particles from "./Particles";
import * as GameStates from "../GameLogic/GameStates"

let mousePos = { x: 0, y: 0 };

class GameLoop {

    fontSize = 30;
    lineHeight = 40;

    originalText;

    paddleWidth = 110;
    paddle = new Paddle({ x: window.innerWidth / 2 - this.paddleWidth / 2, y: window.innerHeight - window.innerHeight / 10 }, { width: this.paddleWidth, height: 15 });
    ball;
    characters = []
    particles = []

    lastTime;
    shouldLoop = true;
    c;//canvas context

    //for game end transition effect
    charsToRestoreInOrder = [];
    timeBetweenRestores = 20;//20ms, .02 seconds
    timeSinceLastRestore = this.timeBetweenRestores + 1;
    restoreIndex = 0;
    won = false;
    endTextOpacity = 1;

    constructor(canvas, text, setGameState) {
        console.log("Game loop constructor")
        this.c = canvas.getContext("2d");
        this.originalText = text;
        this.setGameState = setGameState;
        this.ball = new Ball({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, { width: 20, height: 20 }, this.playGameEndEffect.bind(this));
    }

    setStyles(fontSize) {

        if(!fontSize){
            this.c.font = this.fontSize + 'px ' + 'Open Sans';
        }else{
            this.c.font = fontSize + 'px ' + 'Open Sans';
        }
        this.c.globalAlpha = 1;
        this.c.lineWidth = 2;
        this.c.textBaseline = 'middle';
        this.c.textAlign = 'center';
        this.c.fillStyle = "white";

    }

    queueParticle(particle) {
        this.particles.push(particle);
    }



    //display gameEndText in the center of the screen and return chars to originalText over the course of effectDuration time
    playGameEndEffect(won) {
        console.log("playing game end")
        this.won = won;

        //queue characters to be re-enabled in a cool way, starting from either side of each line, moving inward to the center. Like curtains closing

        let lines = []
        let line = []

        //seperate characters into array of all the lines of characters
        this.characters.forEach((char) => {
            if (char.isNewline) {
                lines.push(line);
                line = []
            } else {
                line.push(char);
            }
        })

        for (let l = 0; l < lines.length; l++) {

            let lineResult = [];

            let half1 = lines[l].slice(0, Math.ceil(lines[l].length / 2))
            let half2 = lines[l].slice(Math.floor(lines[l].length / 2), lines[l].length)

            let half2Reversed = [];

            //need to reverse half2
            for (let i = half2.length - 1; i > -1; i--) {
                half2Reversed.push(half2[i]);
            }

            let half1Index = 0;
            let half2Index = 0;

            //now we need to "shuffle" these two halves together
            for (let i = 0; i < half2Reversed.length + half1.length; i++) {
                if (i % 2 === 0) {
                    lineResult.push(half1[half1Index]);
                    half1Index++
                } else {
                    lineResult.push(half2Reversed[half2Index]);
                    half2Index++
                }
            }

            lines[l] = lineResult;
            ///console.log("line result", lineResult)

        }

        lines.forEach((line) => {
            this.charsToRestoreInOrder.push(line);
        })

        //holy shit, that was a lot. But now we should be able to loop over charsToRestoreInOrder
        //with a small delay between iterations, and set each to their original text for a cool effect 

    }

    updateMousePosition(mPos) {
        mousePos = mPos;
    }

    startLoop() {
        console.log("Start")
        this.doFrame();
        this.setStyles();

        let totalXOffset = 0;
        let yOffset = this.lineHeight;

        let totalIndex = 0;


        let originalTextLines = this.originalText.split("\n");//split on \n, but make sure to include it also

        //initialize by filling characters array with Chars for each character in text
        for (let j = 0; j < originalTextLines.length; j++) {
            totalXOffset = 0;
            for (let i = 0; i < originalTextLines[j].length; i++) {
                let position = { x: window.innerWidth / 2 - this.c.measureText(originalTextLines[j]).width / 2 + (totalXOffset + this.c.measureText(originalTextLines[j][i]).width / 2), y: window.innerHeight / 10 + j * yOffset }
                let char = new Char(originalTextLines[j][i], position, this.c.measureText(originalTextLines[j][i]).width, totalIndex, this.queueParticle.bind(this));
                this.characters.push(char);
                totalXOffset += this.c.measureText(originalTextLines[j][i]).width;
                totalIndex++;
                if (i === originalTextLines[j].length - 1) {//we're at the end, also add a new line char
                    let newline = new Char("", position, 0, totalIndex, () => { }, true);
                    this.characters.push(newline);
                }
            }
        }

    }

    stopLoop() {
        this.shouldLoop = false;
    }

    doFrame(currentTime) {
        //console.log(this.mousePos)
        this.c.clearRect(0, 0, window.innerWidth, window.innerHeight);//clear previous frame

        this.setStyles();

        if (!this.lastTime) this.lastTime = currentTime;
        let deltaTime = currentTime - this.lastTime;//time since last frame
        this.lastTime = currentTime;

        if (isNaN(deltaTime)) {
            deltaTime = 0;
        }

        //draw chars
        this.characters.forEach((char) => {
            //char.drawBounds(c);
            this.setStyles();
            char.draw(this.c);
        });

        //draw particles
        let particlesToDelete = [];
        this.particles.forEach(particle => {
            if (particle.isEffectDone) {
                particlesToDelete.push(particle);
            }
            else {
                particle.draw(this.c, deltaTime);
            }
        });

        if (particlesToDelete.length > 0) {

            particlesToDelete.forEach(particle => {
                this.particles = this.particles.filter((item) => {
                    return item != particle
                });
            });

        }

        particlesToDelete = [];

        //draw paddle
        this.paddle.moveTowards(mousePos.x, window.innerWidth, deltaTime);//smoothly move towards mousePos.x
        this.paddle.draw(this.c);

        //draw ball
        this.ball.move(this.paddle, this.characters, deltaTime);
        this.ball.draw(this.c);

        if (this.charsToRestoreInOrder.length > 0) {
            //do game end effect
            //console.log("drawing end text: ", this.gameEndText, "At", window.innerWidth / 2 - (this.c.measureText(this.gameEndText).width / 2), window.innerHeight / 2)
            this.setStyles(70);
            this.c.globalAlpha = this.endTextOpacity < 0 ? 0 : this.endTextOpacity;
            this.c.fillText(this.won ? "You Won!" : "You Lost.", window.innerWidth / 2, window.innerHeight / 2);

            this.timeSinceLastRestore += deltaTime;

            if (this.timeSinceLastRestore > this.timeBetweenRestores) {
                for (let i = 0; i < this.charsToRestoreInOrder.length; i++) {
                    let lineIndexOffset = this.restoreIndex - i * 2;//each line will be behind by a couple characters, creating a curtain effect
                    if(lineIndexOffset > -1 && lineIndexOffset < this.charsToRestoreInOrder[i].length){
                        let character = this.charsToRestoreInOrder[i][lineIndexOffset];
                        if(character.char == " " && character.originalChar != " "){//eligible for restore
                            character.char = character.originalChar;
                            character.doDestroyParticles(new Particles({ x: character.position.x, y: character.position.y }, Math.random() * 5 + 5));
                        }
                    }
                }
                this.restoreIndex++;
                this.timeSinceLastRestore = 0;
                if(this.restoreIndex > this.originalText.length + this.charsToRestoreInOrder.length * 2) {//yeah... uhhh basically this is just to make sure the characters have all been restored before continuing
                    this.endTextOpacity -= deltaTime/1000; //This will fade the opacity by about 1 per second
                    if(this.endTextOpacity < -0.5){
                        //this.endTextOpacity = 0;
                        if(this.won) {
                            this.setGameState(GameStates.GAME_NOT_STARTED);
                        }else{
                            this.setGameState(GameStates.GAME_NOT_STARTED);
                        }
                    }
                }
            }
        }

        if (this.shouldLoop) {
            requestAnimationFrame(this.doFrame.bind(this));
        }
    }

}

export default GameLoop;