import React, { useState, useEffect } from 'react';

/**
 * Handles the rendering of button grid of letters for inputting guesses
 * @param {array} props.usedLetters - an array of all the letters that have been guessed so far, used to remove buttons from the board
 * CAPITAL LETTERS MUST BE SENT TO THIS COMPONENT FOR IT TO WORK.  this could be fixed
 * @returns a 2 x 13 grid of buttons of the letters A-Z, only unguessed letters are enabled and visible 
 */
const Letters = (props) => {
    let usedLetters = props.usedLetters;
    /** state for the current configuration of letter buttons */
    const [letters, setLetters] = useState([]);

    console.log ('********* Letters Object Render ****************');
    console.log (`usedLetters = ${usedLetters}`);
    
    /**
     * monitors usedLetters and updates the letters state based on what letters have been guessed
     * using ascii codes to generate capital A-Z buttons
     * splices in a line break after 13th letter to split the letters into two rows
     * like letter blanks, this is doing a complete regeneration of every letter after every guess - could be made more efficient
     */
    useEffect(() => {
        setLetters((prev) => {
            let tempLetters = [];
            for (let letter = 65; letter <= 90; letter++){
                let currentLetter = String.fromCharCode(letter);
                if (!usedLetters.includes(String.fromCharCode(letter).toUpperCase())){
                    tempLetters.push(<button disabled={false} onClick={props.handleClick} className="buttons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
                }else{
                    tempLetters.push(<button disabled={true} onClick={props.handleClick} className="disabledButtons" key={letter} id={currentLetter} name={currentLetter}>{currentLetter}</button>)
                }
            }
            tempLetters.splice(Math.floor(tempLetters.length / 2), 0, <br key="lb"></br>);
            return tempLetters;
        });
    }, [usedLetters]);

        
    return (
        <div id="buttonGrid">
            {letters.map((letter) => letter)}
        </div>
    );
}



export { Letters };