import './style.css'
import React, { useState, useEffect, useRef } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js';
import { HangmanDude } from './hangmandude.js';
import { words } from './words.js';
import { Startup } from './startup';

const App = () => {
    
    /* possible game.status(es) 
        'new game' 
        'won' 
        'lost' 
        'in progress' 
        'startup' 
    */

    const [game, setGame] = useState({ status: "startup", startUpStep: 1 })
    const [turn, setTurn] = useState(() => 0);
    const [gameState, setGameState] = useState(() => []);
    const [usedLetters, setUsedLetters] = useState(() => []);
    const word = useRef('');
    let startupTimer = useRef(0);

    useEffect(() => {
        switch (game.status) {
            case ('new game'):
                console.log (startupTimer.current);
                clearInterval(startupTimer.current);
                word.current = words[Math.floor(Math.random() * (words.length - 1))];
                setTurn(0);
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
            case ('startup'):
                console.log ('startup case')
                startupTimer.current = setInterval(() => { 
                    console.log ('interval running');
                    setGame((prevState) => {
                        return(
                            ({
                                ...prevState,
                                startUpStep : prevState.startUpStep + 1
                            })
                        );
                    });
                }, 750);
                break;
            // case ('')
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
            setTurn((prev) => prev + 1);
        }
        setGameState([...currentState]);
        checkWinLose(gameState, turn);
    }

    const addUsedLetter = (letter) => {
        setUsedLetters((prevLetters) => [...prevLetters, letter]);
    }

    const checkWinLose = (currentState, turnsTaken) => {
        if (turnsTaken + 1 <= 6 && currentState.join('').toLowerCase() === word.current.toLowerCase()){
            setGame({status: 'won'});
        }else if (turnsTaken + 1 > 6) {
            setGame({ status: 'lost'});
        }
    }

    const startGame = () => {
        setGame({status: 'new game'});
    }






    return (
        <div id="mainContainer">
            {game.status === 'startup' && <Startup step={game.startUpStep} />}
            {game.status === 'won' && <h3>YOU WON!</h3>}
            {game.status === 'lost' && <h3>YOU LOSE</h3>}
            {game.status === 'in progress' && <HangmanDude turn={turn} />}
            {(game.status === 'in progress' || game.status === 'won' || game.status === 'lost') && <Blanks current={gameState} status={game.status} word={word.current} />}
            {game.status === 'in progress' && <Letters handleClick={handleClick} usedLetters={usedLetters} />}
            {(game.status !== 'in progress' && (game.startUpStep > 4 || !game.startUpStep))  && <div id='newGame'><button onClick={startGame} >New Game</button></div>}
            <h3>{word.current}</h3>
        </div>
    );
}


export { App };