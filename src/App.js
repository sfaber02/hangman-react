import React, { useState } from 'react';
import { Letters } from './letters.js';
import { Blanks } from './blanks.js'
import { HangmanDude } from './hangmandude.js'




const App = () => {
    const word = 'advertisement'.split('');
    const [turn, setTurn] = useState(0);
    const [current, setCurrent] = useState(() => {
        let array = [];
        for (let i = 0; i < word.length; i++){
            array.push('_');
        }
        return array;
    });
    

    const handleClick = ({ target }) => {
        findMatch(target.id);
    }

    const findMatch = (letter) => {
        let foundIndices = [];
        let tempCurr = [...current];
        console.log(tempCurr);
        for (let char in word) {
            if (word[char].toLowerCase() == letter.toLowerCase()){
                foundIndices.push(char);
            }
        }
        if (foundIndices.length){
            for (let i of foundIndices) {
                tempCurr[i] = letter;
            }
        }else{
            setTurn((prev) => prev + 1);
        }
        console.log (tempCurr);
        setCurrent (tempCurr);
        console.log (current);
    }




    return (
        <div>
            <h2>Hangman</h2>
            <HangmanDude turn={turn} />
            <Blanks current={current} />
            <Letters handleClick={handleClick} />
            <h3>{turn}</h3>
            <h3>{current}</h3>
        </div>
    );
}


export { App };