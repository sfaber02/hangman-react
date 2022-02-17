import React, { useState, useEffect } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js';
import { HangmanDude } from './hangmandude.js';
import { words } from './words.js';


const App = () => {
    
    //4 possible statuses 'new game', 'won', 'lost', 'in progress'
    const [game, setGame] = useState({ status: "new game" })
    const [ word, setWord ] = useState(words[Math.floor(Math.random() * (words.length - 1))]);
    console.log (word) //for cheating
    const [turn, setTurn] = useState(() => 0);
    const [gameState, setGameState] = useState(() => {
        let initialBoard = [];
        for (let e = 0; e < word.length; e++) {
            initialBoard.push ('_');
        }
        return initialBoard;
    });
    const [usedLetters, setUsedLetters] = useState(() => []);


    useEffect(() => {
        
    }, [game]);
    

    const handleClick = ({ target }) => {
        findMatch(target.id, gameState);
        addUsedLetter(target.id);
    }
    
    const findMatch = (letter, currentState) => {
        let foundOne = false;
        for (let char in word) {
            if (word[char].toLowerCase() == letter.toLowerCase()){
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
        console.log (turnsTaken);
        if (turnsTaken + 1 <= 6 && currentState.join('').toLowerCase() === word.toLowerCase()){
            console.log ('You WIN!');
            setGame({status: 'won'});
        }else if (turnsTaken + 1 > 6) {
            console.log ('YOU LOSE')
            setGame({ status: 'lost'});
        }
    }

    const startGame = () => {
        setGame({status: 'in progress'});
        console.log ('new game start');
    }






    return (
        <div>
            <h2>Hangman</h2>
            {game.status == 'in progress' && <HangmanDude turn={turn} />}
            {game.status == 'in progress' && <Blanks current={gameState} />}
            {game.status == 'in progress' && <Letters handleClick={handleClick} usedLetters={usedLetters} />}
            {game.status !== 'in progress' && <button id='newGame' onClick={startGame} >New Game</button>}
            
        </div>
    );
}


export { App };