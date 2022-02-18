import './style.css'
import React, { useState, useEffect, useRef } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js';
import { HangmanDude } from './hangmandude.js';
import { words } from './words.js';

const App = () => {
    
    //5 possible statuses 'new game', 'won', 'lost', 'in progress', 'startup'
    const [game, setGame] = useState({ status: "startup" })
    const word = useRef('');
    const [turn, setTurn] = useState(() => 0);
    const [gameState, setGameState] = useState(() => []);
    const [usedLetters, setUsedLetters] = useState(() => []);


    useEffect(() => {
        switch (game.status) {
            case ('new game'):
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
            {game.status != 'in progress' ? <h2>Hangman</h2> : <br></br>}
            {game.status === 'in progress' && <HangmanDude turn={turn} />}
            {game.status === 'in progress' && <Blanks current={gameState} />}
            {game.status === 'in progress' && <Letters handleClick={handleClick} usedLetters={usedLetters} />}
            {game.status === 'won' && <h3>YOU WON!</h3>}
            {game.status === 'lost' && <h3>YOU LOSE</h3>}
            {game.status !== 'in progress' && <div id='newGame'><button onClick={startGame} >New Game</button></div>}
            {/* <h3>{word.current}</h3> */}
        </div>
    );
}


export { App };