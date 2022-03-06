import React from 'react';
import boardGraphics from './graphics/board-graphics.js';

/**
 * 
 * @param {number} props.turn number of bad guesses 
 * @import {array} boardGraphics - an array of images of all states of the hangman graphics (including 1 secret image *wink*)
 * @returns renders the hangman graphic based on how many wrong guesses have been made in the round
 */
const HangmanDude = (props) => {
    let turn = props.turn;

    /** to be certain we don't go past the amount of graphics that exist
     * game SHOULD end before this ever happens, can probably be removed
     */
    if (turn > 7) turn = 7;

    return (
       <div id="hangmanBoard">
           <img alt="hangmanDude" className='bigGraphics' src={boardGraphics[turn]} />
       </div> 
    );
}

export { HangmanDude };