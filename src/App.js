import './style.css'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js';
import { HangmanDude } from './hangmandude.js';
import { words } from './words.js';
import { Startup } from './startup';
import { ScoreBoard } from './scoreboard';
import { HighScore } from './highscore.js';
import soundEffects from './sounds/sounds.js';


const App = () => {
    
    /* possible game.status(es) 
        'startup' 
        'new game'
        'in progress' 
        'continue' 
        'won' 
        'lost' 
    */

    
    const [game, setGame] = useState({ status: "startup", startUpStep: 1 })
    const [gameState, setGameState] = useState(() => []);
    const [usedLetters, setUsedLetters] = useState(() => []);
    const [scoreLives, setScoreLives] = useState({score: 0, lives: 3 });
    const word = useRef('');
    let startupTimer = useRef(0);
    let tries = useRef(() => 0);
    let currentGameState = useRef(() => []);
    let currentUsedLetters = useRef(() => []);
    

    useEffect(() => {
        console.log (game.status);
        switch (game.status) {
            case ('startup') :
                startupTimer.current = setInterval(() => { 
                    setGame((prevState) => {
                        return(
                            ({
                                ...prevState,
                                startUpStep : prevState.startUpStep + 1
                            })
                        );
                    });
                }, 50);
                break;
            case ('new game') :
                soundEffects.startGame.play();
                clearInterval(startupTimer.current);
                document.getElementById('mainContainer').style.borderBottom = "0";
                setScoreLives({score: 0, lives: 3});
                word.current = words[Math.floor(Math.random() * (words.length - 1))];
                tries.current = 0;
                setGameState(() => {
                    let initialBoard = [];
                    for (let e = 0; e < word.current.length; e++) {
                        initialBoard.push ('_');
                    }
                    return initialBoard;
                });
                setUsedLetters(() => []);
                setGame({status: 'in progress'});
                break;
            case ('continue'):
                soundEffects.startGame.play();
                word.current = words[Math.floor(Math.random() * (words.length - 1))];
                tries.current = 0;
                setGameState(() => {
                    let initialBoard = [];
                    for (let e = 0; e < word.current.length; e++) {
                        initialBoard.push ('_');
                    }
                    return initialBoard;
                });
                setUsedLetters(() => []);
                setGame({status: 'in progress'});
                break;
            case ('in progress'):
                console.log ('in progress event listener added');
                document.addEventListener('keydown', handleKeyPress);
                break;
            case ('won') :{
                console.log ('won event listener SHOULD BE REMOVED');
                document.removeEventListener("keydown", handleKeyPress);
                let tempScore = word.current.length * 100 - tries.current * 30;
                tempScore = tempScore < 1 ? 1 : tempScore;
                setScoreLives((prev) => {
                    return({
                        ...prev,
                        score: prev.score + tempScore
                    })
                }); 
                break;
            }
            case ('lost') :
                console.log ('lost event listener SHOULD BE REMOVED');
                document.removeEventListener('keydown', () => handleKeyPress);
                setScoreLives((prev) => {
                    return ({
                        ...prev,
                        lives: prev.lives - 1
                    })
                });
                break;
            default:
                break;
            
        }
    }, [game.status]);

    useEffect (() => {
        console.log (`set new currentGameStateRef to ${gameState}`);
        currentGameState.current = [...gameState];
    }, [gameState]);

    useEffect(() => {
        console.log (`set new currentUsedLetters to ${usedLetters}`);
        currentUsedLetters.current = [...usedLetters];
    }, [usedLetters]);
 
    
    const handleClick = ({ target }) => {
        console.log ('********* HandleClick *********');
        console.log (target.id);
        console.log (`gameState = ${gameState}`);
        console.log (`currentGameState = ${currentGameState.current}`);
        console.log (`usedLetters = ${usedLetters}`);
        console.log (`currentUsedLetters = ${currentUsedLetters.current}`);
        findMatch(target.id);
        addUsedLetter(target.id);
    }

    const handleKeyPress = useCallback((event) => {
        let letter = event.key.toUpperCase();
        console.log ('********* Handle Key Press *********');
        console.log (letter);
        console.log (`gameState = ${gameState}`);
        console.log (`currentGameState = ${currentGameState.current}`);
        console.log (`usedLetters = ${usedLetters}`);
        console.log (`currentUsedLetters = ${currentUsedLetters.current}`);
        if (!currentUsedLetters.current.includes(letter) && (/[A-Z]/.test(letter))) {
            findMatch(letter);
            addUsedLetter(letter);
        }
    }, []);
    
    const findMatch = (letter) => {
        console.log ('********* Find Match *********');
        console.log (`gameState = ${gameState}`);
        console.log (`currentGameState = ${currentGameState.current}`);
        console.log (`usedLetters = ${usedLetters}`);
        console.log (`currentUsedLetters = ${currentUsedLetters.current}`);
        let foundOne = false;
        for (let char in word.current) {
            if (word.current[char].toLowerCase() == letter.toLowerCase()){
                currentGameState.current[char] = letter;
                foundOne = true;
            }
        }
        if (!foundOne){
            tries.current++;
        }
        setGameState([...currentGameState.current]);
        checkWinLose(tries.current, foundOne);
    }

    const addUsedLetter = (letter) => {
        console.log ('********* Add used Letter *********');
        setUsedLetters((prevLetters) => [...prevLetters, letter]);
    }

    const checkWinLose = (turnsTaken, foundOne) => {
        console.log (`********Check win/Lose ************`);
        console.log (`gameState = ${gameState}`);
        console.log (`currentGameState = ${currentGameState.current}`);
        console.log (`usedLetters = ${usedLetters}`);
        console.log (`currentUsedLetters = ${currentUsedLetters.current}`);
        if (turnsTaken <= 7 && currentGameState.current.join('').toLowerCase() === word.current.toLowerCase()){
            soundEffects.correctLetter.pause();
            soundEffects.correctWord.play();
            setGame({status: 'won'});
        }else if (turnsTaken > 6) {
            soundEffects.wrongLetter.pause();
            soundEffects.wrongWord.play();
            setGame({ status: 'lost'});
        }else {
            if (foundOne) {
                soundEffects.correctLetter.currentTime = 0;
                soundEffects.correctLetter.play();
            } else {
                soundEffects.wrongLetter.currentTime = 0;
                soundEffects.wrongLetter.play();
            }
        }
    }

    const startGame = () => {
        setGame({status: 'new game'});
    }

    const continueGame = () => {
        setGame({status: 'continue'});
    }



    return (
        <div id="mainContainer">
            {game.status === 'startup' && 
                <Startup step={game.startUpStep} />
            }
            {game.status === 'won' &&
                <div className="scoreMessage">
                    <h1>THAT'S IT!</h1>
                    <h4>Scored {word.current.length * 100 - tries.current * 30} Points</h4>
                </div>
            }
            {game.status === 'lost' && 
                <div className='scoreMessage'>
                    <h1>YOU ARE HANGED</h1>
                    <h4>The word was:</h4>
                </div>
            }
            {game.status === 'in progress' && 
                <HangmanDude turn={tries.current} />
            }
            {(game.status === 'in progress' || game.status === 'won' || game.status === 'lost') && 
                <Blanks current={gameState} status={game.status} word={word.current} />
            }
            {game.status === 'in progress' && 
                <Letters handleClick={handleClick} usedLetters={usedLetters} />
            }
            {game.status != 'startup' && 
                <ScoreBoard scoreLives={scoreLives} turn={tries.current} />
            }
            <div id="menu">
                {(game.status !== 'in progress' && game.status !== 'won' && (game.status != 'lost' || scoreLives.lives <= 0) && (game.startUpStep > 4 || !game.startUpStep))  && 
                    <div id="newGame"><button className='menuButtons' onClick={startGame} >New Game</button></div>
                }
                {(game.status == 'won' || game.status == 'lost' && scoreLives.lives > 0)  && 
                    <div id="continue"><button className='menuButtons' onClick={continueGame} >Continue</button></div>
                }
            </div>
            <h3 id="cheatWord">{word.current}</h3>
        </div>
    );
}


export { App };