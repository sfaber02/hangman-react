import React, { useState, useEffect } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js'
import { HangmanDude } from './hangmandude.js'




const App = () => {
    const word = 'banana'.split('');
    const [turn, setTurn] = useState(0);
    let current = [];
    const [gameState, setGameState] = useState(current);
    
    
    useEffect(() => {
        console.log ('initialize state');
        for (let e = 0; e < word.length; e++) {
            current.push ('_');
        }
        setGameState(() => [...current]);
        console.log (current);
        console.log (gameState);
    }, [] );

    
    const handleClick = ({ target }) => {
        findMatch(target.id);
        console.log (current);
    }

    const findMatch = (letter) => {
        let foundOne = false;
        for (let char in word) {
            if (word[char].toLowerCase() == letter.toLowerCase()){
                current[char] = letter;
                foundOne = true;
            }
        }
        if (!foundOne){
            setTurn((prev) => prev + 1);
        }
        setGameState([...current]);
    }




    return (
        <div>
            <h2>Hangman</h2>
            <HangmanDude turn={turn} />
            <Blanks current={gameState} />
            <Letters handleClick={handleClick} />
            <h3>{turn}</h3>
            <h3>{current}</h3>
        </div>
    );
}


export { App };