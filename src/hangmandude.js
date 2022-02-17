import React, { useEffect } from 'react';
import boardGraphics from './graphics/images';
import './style.css'

const HangmanDude = (props) => {
    let turn = props.turn;
    if (turn > 7) turn = 7;

    return (
       <div>
           <img id="board" src={boardGraphics[turn]} />
       </div> 
    );
}

export { HangmanDude };