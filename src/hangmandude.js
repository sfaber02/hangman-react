import React from 'react';
import boardGraphics from './graphics/images';
import './style.css'

const HangmanDude = () => {
    return (
       <div>
           <img id="board" src={boardGraphics[6]} />
       </div> 
    );
}

export { HangmanDude };