import React, { useState, useEffect } from 'react';
import letterGraphics from './graphics/letter-graphics';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handles the rendering and updating of the blank letter spaces.  
 * These spaces will mirror what is the in the {current} array
 * 
 * @param {array} props.current = current game board state
 * @param {string} props.status = string of current game.status
 * @param {string} props.word = string of current word to be guessed
 * @import {array} letterGraphics - an array of images of the letters A-Z and a blank space.
 * @import {function} uuidv4 - generates random keys for unique identifiers (required by react)
 * @returns rendered letter blanks based on current round state
 */
const Blanks = (props) => {
    const current = props.current;
    const status = props.status;
    const word = props.word;
    let solved = [];
    console.log ('********* Blanks Object Render ****************');
    console.log (`current = ${current}`);

    /**
     * Letter blanks state.
     * Initializes to an array of '_' images based on the length of word  
     */
    const [letterBlanks, setLetterBlanks] = useState(() => {
        let tempLetterArray = [];
        for (let c = 0; c < current.length; c++) {
            tempLetterArray.push(<img style={{maxWidth: `${100 / word.length}%`}} className='letters' src={letterGraphics.blank} key={uuidv4()} id='_' />);
        }
        return tempLetterArray;
    });

    /**
     * Monitors current for changes and re-renders blanks with updates based on state of current
     */
    useEffect(() => {
        setLetterBlanks((prevBlanks) => {
            let tempBlanks = [...prevBlanks];
            for (let letter in current) {
                if (current[letter] != tempBlanks[letter].props.id) {
                    tempBlanks.splice(letter, 1, <img style={{maxWidth: `${100 / word.length}%`}} className='letters' src={letterGraphics[current[letter].toLowerCase()]} key={uuidv4()} id={current[letter].toLowerCase()} />);
                }
            }
            return [...tempBlanks];
        });
    }, [current]);

    /**
     * If round has ended render the solution into an array called solved 
     * to be used for displaying on the won/lost screen
     */
    if (status == 'lost' || status == 'won') {
        for (let letter of word) {
            solved.push(<img style={{maxWidth: `${100 / word.length}%`}} className='letters' src={letterGraphics[letter]} key={uuidv4()} id={letter} />)
        }
    }

    /**
     * Renders letter blanks if round is in progress or solution if round is over
     */
    return (
        <div id='letterBlanks'>
            {status === 'in progress' && letterBlanks.map((blank) => blank)}
            {(status === 'won' || status === 'lost') && solved.map((letter) => letter)}
        </div>
    );
}

export { Blanks };