import './style.css'
import React, { useState, useEffect, useRef } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js';
import { HangmanDude } from './hangmandude.js';
import { words } from './words.js';
import { Startup } from './startup';
import { ScoreBoard } from './scoreboard';



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

    useEffect(() => {
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
                clearInterval(startupTimer.current);
                document.getElementById('mainContainer').style.borderBottom = "0";
                setScoreLives({score: 0, lives: 3, status: game.status});
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
            case ('won') :{
                let tempScore = word.current.length * 100 - tries.current * 30;
                setScoreLives((prev) => {
                    return({
                        ...prev,
                        score: prev.score + tempScore
                    })
                }); 
                break;
            }
            case ('lost') :
                setScoreLives((prev) => {
                    return ({
                        ...prev,
                        lives: prev.lives - 1
                    })
                });
                break;
            
        }
    }, [game.status]);

    const handleClick = ({ target }) => {
        findMatch(target.id, gameState);
        addUsedLetter(target.id);
    }
    
    const findMatch = (letter, currentState) => {
        let foundOne = false;
        for (let char in word.current) {
            if (word.current[char].toLowerCase() == letter.toLowerCase()){
                currentState[char] = letter;
                foundOne = true;
            }
        }
        if (!foundOne){
            tries.current++;
        }
        setGameState([...currentState]);
        checkWinLose(gameState, tries.current);
    }

    const addUsedLetter = (letter) => {
        setUsedLetters((prevLetters) => [...prevLetters, letter]);
    }

    const checkWinLose = (currentState, turnsTaken) => {
        if (turnsTaken <= 7 && currentState.join('').toLowerCase() === word.current.toLowerCase()){
            setGame({status: 'won'});
        }else if (turnsTaken > 6) {
            setGame({ status: 'lost'});
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