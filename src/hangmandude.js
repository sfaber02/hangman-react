import React, { useEffect } from 'react';
import boardGraphics from './graphics/board-graphics';


const HangmanDude = (props) => {
    let turn = props.turn;
    if (turn > 7) turn = 7;

    return (
       <div id="hangmanBoard">
           <img className='bigGraphics' src={boardGraphics[turn]} />
       </div> 
    );
}

export { HangmanDude };